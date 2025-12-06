from typing import List, Literal

from pydantic import BaseModel, Field

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
