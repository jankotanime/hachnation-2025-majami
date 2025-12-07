import logging
import os
from typing import Optional
from Explain import ExplanationResponse, ExplanationRequest
from dotenv import load_dotenv
from openai import AsyncOpenAI

load_dotenv()

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
        response_format=ExplanationResponse
    )
    details = completion.choices[0].message.parsed

    logger.info(f"Explained description: {details.model_dump_json(indent=2)}")

    return details

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
