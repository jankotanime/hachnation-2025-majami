import { Legislative } from "../types/legislative"
export const data: Legislative[] = [
	{
		"id": "leg-001",
		"title": "Cyfryzacja",
		"content": "Kategoria dotycząca cyfryzacji usług publicznych i transformacji cyfrowej",
		"bills": [
			{
				"id": "bill-001-1",
				"title": "Ustawa o cyfryzacji usług publicznych",
				"description": "Jednolite standardy API dla usług administracji",
				"status": "uchwalony"
			},
			{
				"id": "bill-001-2",
				"title": "Prawo podpisu elektronicznego",
				"description": "Upowszechnianie podpisu elektronicznego",
				"status": "uchwalony"
			},
			{
				"id": "bill-001-3",
				"title": "Digitalizacja dokumentów",
				"description": "Obowiązek digitalizacji dokumentów publicznych",
				"status": "sejm"
			},
			{
				"id": "bill-001-4",
				"title": "API w urzędach",
				"description": "Interfejsy API dostępne dla obywateli",
				"status": "konsultacje"
			},
			{
				"id": "bill-001-5",
				"title": "Bezpieczeństwo danych",
				"description": "Normy bezpieczeństwa dla usług cyfrowych",
				"status": "przed_konsultacjami"
			},
			{
				"id": "bill-001-6",
				"title": "Portal e-usług",
				"description": "Centralna platforma e-usług",
				"status": "zapowiedziany"
			}
		]
	},
	{
		"id": "leg-002",
		"title": "Energia",
		"content": "Kategoria regulacji energetycznych i odnawialnych źródeł energii",
		"bills": [
			{
				"id": "bill-002-1",
				"title": "Nowelizacja prawa energetycznego",
				"description": "Gwarancja pochodzenia energii z OZE",
				"status": "uchwalony"
			},
			{
				"id": "bill-002-2",
				"title": "Prosument energii",
				"description": "Uproszczone procedury przyłączeniowe",
				"status": "sejm"
			},
			{
				"id": "bill-002-3",
				"title": "Energia słoneczna",
				"description": "Wsparcie dla paneli słonecznych",
				"status": "konsultacje"
			},
			{
				"id": "bill-002-4",
				"title": "Energia wiatrowa",
				"description": "Regulacje dla farm wiatrowych",
				"status": "rada_ministrow"
			},
			{
				"id": "bill-002-5",
				"title": "Przechowywanie energii",
				"description": "Magazynowanie energii odnawialnej",
				"status": "przed_konsultacjami"
			}
		]
	},
	{
		"id": "leg-003",
		"title": "AI i Dane",
		"content": "Kategoria regulacji sztucznej inteligencji i ochrony danych",
		"bills": [
			{
				"id": "bill-003-1",
				"title": "Ustawa o ochronie danych w AI",
				"description": "Wymagania minimalizacji danych w systemach AI",
				"status": "konsultacje"
			},
			{
				"id": "bill-003-2",
				"title": "Rejestr modeli AI",
				"description": "Rejestr modeli wysokiego ryzyka",
				"status": "konsultacje"
			},
			{
				"id": "bill-003-3",
				"title": "Przejrzystość algorytmów",
				"description": "Obowiązek ujawniania algorytmów decyzyjnych",
				"status": "przed_konsultacjami"
			},
			{
				"id": "bill-003-4",
				"title": "Audyty AI",
				"description": "Obowiązkowe audyty systemów AI",
				"status": "zapowiedziany"
			},
			{
				"id": "bill-003-5",
				"title": "Odpowiedzialność AI",
				"description": "Odpowiedzialność producentów AI",
				"status": "zapowiedziany"
			},
			{
				"id": "bill-003-6",
				"title": "GDPR i AI",
				"description": "Zgodność GDPR z AI",
				"status": "wstrzymany"
			}
		]
	},
	{
		"id": "leg-004",
		"title": "Transport",
		"content": "Kategoria regulacji transportu i mobilności",
		"bills": [
			{
				"id": "bill-004-1",
				"title": "Pojazdy autonomiczne",
				"description": "Zasady testów pojazdów autonomicznych",
				"status": "sejm"
			},
			{
				"id": "bill-004-2",
				"title": "Odpowiedzialność operatora",
				"description": "Odpowiedzialność operatora pojazdów zdalnych",
				"status": "sejm"
			},
			{
				"id": "bill-004-3",
				"title": "Telemetria pojazdów",
				"description": "Wymagania telemetrii dla pojazdów",
				"status": "rada_ministrow"
			},
			{
				"id": "bill-004-4",
				"title": "Bezpieczeństwo transportu",
				"description": "Normy bezpieczeństwa transportu",
				"status": "konsultacje"
			},
			{
				"id": "bill-004-5",
				"title": "E-mobilność",
				"description": "Wsparcie dla transportu elektrycznego",
				"status": "uchwalony"
			}
		]
	},
	{
		"id": "leg-005",
		"title": "Nauka i Badania",
		"content": "Kategoria regulacji dotyczących nauki i badań naukowych",
		"bills": [
			{
				"id": "bill-005-1",
				"title": "Otwarte dane naukowe",
				"description": "Deponowanie wyników w repozytoriach open access",
				"status": "uchwalony"
			},
			{
				"id": "bill-005-2",
				"title": "Dostęp do publikacji",
				"description": "Wolny dostęp do publikacji naukowych",
				"status": "podpis_prezydenta"
			},
			{
				"id": "bill-005-3",
				"title": "Metadane FAIR",
				"description": "Wymogi metadanych FAIR dla badań",
				"status": "sejm"
			},
			{
				"id": "bill-005-4",
				"title": "Finansowanie badań",
				"description": "Warunki finansowania badań publicznych",
				"status": "konsultacje"
			},
			{
				"id": "bill-005-5",
				"title": "Infrastruktura badawcza",
				"description": "Wspólna infrastruktura badawcza",
				"status": "rada_ministrow"
			},
			{
				"id": "bill-005-6",
				"title": "Transfer technologii",
				"description": "Ułatwienia w transferze technologii",
				"status": "przed_konsultacjami"
			}
		]
	}
]
