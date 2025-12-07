import requests

TERMS = 10
BASE_URL = "https://api.sejm.gov.pl/sejm/" 

def build_url_for_processes_list(term_num):
    return f"{BASE_URL}/term{term_num}/processes"

def build_url_for_specific_process(process_list_url, process_num):
    return f"{process_list_url}/{process_num}"

def handle_request(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None

def collect_stage(stage_obj, term, bucket):
    if not isinstance(stage_obj, dict):
        return

    stage_copy = {k: v for k, v in stage_obj.items() if k != "children"}
    if "voting" in stage_copy:
        stage_copy["voting"] = "voting"
    stage_copy["term"] = term
    bucket.append(stage_copy)

    children = stage_obj.get("children", [])
    if isinstance(children, list):
        for child in children:
            collect_stage(child, term, bucket)

def get_all_stages():
    with open("stages.txt", "w", encoding="UTF-8") as file:
        for term in range(1, TERMS + 1):
            file.write(f"---------term{term}----------\n")

            term_stage_rows = []

            url = build_url_for_processes_list(term)
            processes = handle_request(url)
            if not processes:
                continue

            for process in processes:
                process_url = build_url_for_specific_process(url, int(process["number"]))
                process_detail = handle_request(process_url)
                if not process_detail:
                    continue

                stages_list = process_detail.get("stages", [])
                if not isinstance(stages_list, list):
                    continue

                for stage in stages_list:
                    collect_stage(stage, term, term_stage_rows)

            for row in term_stage_rows:
                file.write(f"{row}\n")


get_all_stages()