import logging
import os
import asyncio
import encodings
from typing import Optional, List, Literal
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from openai import AsyncOpenAI

load_dotenv()

class ExplanationRequest(BaseModel):
    """Request model for explanation"""

    request_type: Literal["act-link", "other"] = Field(
        description="Type of request being made",
    )
    confidence_score: float = Field(description="Confidence score between 0 and 1")
    description: str = Field(description="Text to be explained")

class ExplanationDetails(BaseModel):
    """Details model for explanation"""

    content: str = Field(description="Content of explanation")
    key_points: List[str] = Field(
        description="List of keypoints extracted from explanation"
    )

class ExplanationResponse(BaseModel):
    """Response model for explanation"""

    success: bool = Field(description="Success flag")
    message: str = Field(description="Response message")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
model = "gpt-4o-mini"

async def route_explanation_request(user_input: str) -> ExplanationRequest:
    """Router LLM call to determine the type of explanation request"""
    logger.info("Routing explanation request")

    completion = await client.beta.chat.completions.parse(
        model=model,
        messages=[
            {
                "role": "system",
                "content": "Określ, czy jest to link do ustawy."
            },
            {"role": "user", "content": user_input}
        ],
        response_format=ExplanationRequest
    )
    result = completion.choices[0].message.parsed
    logger.info(
        f"Request routed as: {result.request_type} with confidence: {result.confidence_score}"
    )
    return result

async def handle_explanation(description: str) -> ExplanationResponse:
    """Process an explanation"""
    logger.info("Processing explanation")
    completion = await client.beta.chat.completions.parse(
        model=model,
        messages=[
            {
                "role": "system",
                "content": "Stwórz opis ustawy z podanego linku w języku zrozumiałym dla"
                           "przeciętnego obywatela. W odpowiedzi uwzględnij"
                           "najważniejsze punkty danej ustawy oraz ogólny opis."
            },
            {"role": "user", "content": description},
        ],
        response_format=ExplanationDetails
    )
    details = completion.choices[0].message.parsed

    logger.info(f"Explained description: {details.model_dump_json(indent=2)}")

    return ExplanationResponse(
        success=True,
        message=f"Keypoints: {details.key_points}\n\n"
                f"Content: '{details.content}'"
    )

async def process_explanation_request(user_input: str) -> Optional[ExplanationResponse]:
    """Main function implementing the routing workflow"""
    logger.info("Processing explanation request")

    route_result = await route_explanation_request(user_input)

    if route_result.confidence_score < 0.9:
        logger.warning(f"Low confidence score: {route_result.confidence_score}")
        return None

    if route_result.request_type == "act-link":
        return await handle_explanation(route_result.description)
    else:
        logger.warning("Request type not supported")
        return None

# --------------------------------------------------------------
# TESTS (async runner)
# --------------------------------------------------------------

async def main():
    valid_input = "https://orka.sejm.gov.pl/Druki10ka.nsf/0/BFD04848ECC80979C1258D55002D7562/%24File/2037.pdf"
    result = await process_explanation_request(valid_input)
    if result:
        with open("valid_response.md", "w", encoding="UTF-8") as file:
            file.write(result.message)

    invalid_input = "Jaka jest dzisiaj pogoda?"
    result = await process_explanation_request(invalid_input)
    if not result:
        print("Request not recognized as an explain operation")

if __name__ == "__main__":
    asyncio.run(main())