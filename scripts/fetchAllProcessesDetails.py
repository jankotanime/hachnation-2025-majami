import requests

processes = dict() # dict
stagesTypes = {} # set
stagesValues = {} # set
TERMS = 10

BASE_URL = "https://api.sejm.gov.pl/sejm/" 

def build_url_for_processes_list(term_num):
    return f"{BASE_URL}/term{term_num}/processes"

def build_url_for_specific_process(process_list_url, process_num):
    return f"{process_list_url}/{process_num}"

def handle_request(url):
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data
    return None

def get_all_processes():
    with open("processes.txt", "w", encoding="UTF-8") as file:
        for i in range(1, TERMS+1, 1):
            processes[i] = list()
            file.write(f"---------term{i}----------\n")
            url = build_url_for_processes_list(i)
            data = handle_request(url)
            for process in data:
                process_url = build_url_for_specific_process(url, int(process["number"]))
                data_process = handle_request(process_url)
                if "description" in data_process:
                    data_process.pop("description")
                data_process.pop("stages")
                processes_list = processes[i]
                processes_list.append(data_process)
                processes[i] = processes_list
                file.write(f"{data_process}\n")
                
get_all_processes()