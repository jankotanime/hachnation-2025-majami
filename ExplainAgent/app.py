from typing import Optional
from flask import Flask, request, jsonify
from ExplanationService import process_explanation_request, ExplanationResponse


app = Flask(__name__)

@app.route("/explain", methods=["POST"])
async def explain_act() -> Optional[ExplanationResponse]:
    json_body = request.get_json(silent=True)
    link = None
    if isinstance(json_body, dict):
        link = json_body.get("link") or json_body.get("url")
    if not link:
        link = request.form.get("link") or request.form.get("url")
    if not link:
        return jsonify({
            "error": "Missing 'link' parameter in JSON body or form-data"
        }), 400

    explanation_response = await process_explanation_request(link)

    response_body = {
        "content": explanation_response.content,
        "key_points": explanation_response.key_points
    }
    return jsonify(response_body), 200

@app.route("/health-check")
def health_check():
    return {"status": "ok"}, 200