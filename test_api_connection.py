"""
Azure OpenAI API接続テスト
"""
import requests
from config import PROXIES, API_CONFIGS, setup_proxy_env

def test_api_connection():
    """全APIエンドポイントの接続テスト"""
    setup_proxy_env()

    print("=== Azure OpenAI API接続テスト ===\n")

    for model_name, config in API_CONFIGS.items():
        print(f"【{model_name}】")
        print(f"  Endpoint: {config['endpoint']}")

        try:
            headers = {
                "Content-Type": "application/json",
                "api-key": config["api_key"]
            }

            url = f"{config['endpoint']}/openai/deployments/{config['model']}/chat/completions?api-version={config['api_version']}"

            payload = {
                "messages": [{"role": "user", "content": "Hello"}],
                "max_completion_tokens": 10,
                "temperature": 0.1
            }

            response = requests.post(
                url,
                headers=headers,
                json=payload,
                proxies=PROXIES,
                timeout=30
            )

            if response.status_code == 200:
                print(f"  Status: OK (200)")
                result = response.json()
                if 'choices' in result:
                    print(f"  Response: {result['choices'][0]['message']['content']}")
            else:
                print(f"  Status: {response.status_code}")
                print(f"  Error: {response.text[:200]}")

        except Exception as e:
            print(f"  Error: {str(e)[:150]}")

        print()

    print("=== テスト完了 ===")

if __name__ == "__main__":
    test_api_connection()
