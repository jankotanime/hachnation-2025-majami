from typing import Optional
from flask import Flask, request

from ExplanationService import process_explanation_request, ExplanationResponse


app = Flask(__name__)

@app.route("/explain")
async def explain_act() -> Optional[ExplanationResponse]:
    return await process_explanation_request(request.form.get("link"))

@app.route("/health-check")
def health_check():
    return {"status": "ok"}, 200