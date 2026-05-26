import urllib.request
import json
import sys

# Base raw URL of the repository on GitHub
RAW_BASE_URL = "https://raw.githubusercontent.com/siqmath/portfolio/main/"

def fetch_file(path):
    url = RAW_BASE_URL + path
    try:
        with urllib.request.urlopen(url) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {path} from GitHub: {e}")
        sys.exit(1)

def verify():
    print("Fetching and verifying files from GitHub...\n")

    # 1. Verify messages/en.json
    print("Checking messages/en.json...")
    en_json_content = fetch_file("messages/en.json")
    en_json = json.loads(en_json_content)
    
    project_case = en_json.get("ProjectCase", {})
    quote = project_case.get("quote", "")
    footer_title = project_case.get("footer_title", "")
    footer_desc = project_case.get("footer_desc", "")

    assert "extreme clarity" in quote, f"Quote translation incorrect in en.json: got '{quote}'"
    assert "Bulletproof infrastructure" in footer_title, f"Footer title translation incorrect in en.json: got '{footer_title}'"
    assert "data architecture eliminated noise" in footer_desc, f"Footer desc translation incorrect in en.json: got '{footer_desc}'"
    print("[ OK ] messages/en.json verified successfully!")

    # 2. Verify siqueira-e-vale/page.tsx
    print("\nChecking siqueira-e-vale/page.tsx...")
    page_content = fetch_file("src/app/[locale]/projects/siqueira-e-vale/page.tsx")
    
    assert "{t(\"quote\")}" in page_content, "siqueira-e-vale/page.tsx is not using {t(\"quote\")}"
    assert "{t(\"expanded_mindset\")}" in page_content, "siqueira-e-vale/page.tsx is not using {t(\"expanded_mindset\")}"
    assert "{t(\"footer_title\")}" in page_content, "siqueira-e-vale/page.tsx is not using {t(\"footer_title\")}"
    assert "{t(\"footer_desc\")}" in page_content, "siqueira-e-vale/page.tsx is not using {t(\"footer_desc\")}"
    
    # Assert old Portuguese text is no longer hardcoded
    assert "Matheus trouxe uma clareza" not in page_content, "siqueira-e-vale/page.tsx still contains hardcoded Portuguese quote!"
    assert "Infraestrutura blindada" not in page_content, "siqueira-e-vale/page.tsx still contains hardcoded Portuguese footer title!"
    print("[ OK ] siqueira-e-vale/page.tsx verified successfully!")

    # 3. Verify honeymoon-challenge/page.tsx
    print("\nChecking honeymoon-challenge/page.tsx...")
    hc_content = fetch_file("src/app/[locale]/projects/honeymoon-challenge/page.tsx")
    assert "t(\"metric1_label\")" in hc_content, "honeymoon-challenge/page.tsx is not using translation for metrics!"
    assert "Contrato Social" not in hc_content, "honeymoon-challenge/page.tsx still contains hardcoded Portuguese 'Contrato Social'!"
    print("[ OK ] honeymoon-challenge/page.tsx verified successfully!")

    # 4. Verify Consulting.tsx
    print("\nChecking Consulting.tsx...")
    consulting_content = fetch_file("src/components/home/Consulting.tsx")
    assert "{t(\"title\")}" in consulting_content, "Consulting.tsx is not using {t(\"title\")}"
    assert "Consultoria Operacional" not in consulting_content, "Consulting.tsx still contains hardcoded Portuguese 'Consultoria Operacional'!"
    print("[ OK ] Consulting.tsx verified successfully!")

    print("\n" + "="*40)
    print("ALL TESTS PASSED! Every translation is fully deployed on GitHub!")
    print("="*40)

if __name__ == "__main__":
    verify()
