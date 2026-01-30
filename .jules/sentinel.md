## 2026-01-30 - Telegram Auth Replay Attack
**Vulnerability:** Telegram `initData` validation did not check `auth_date`, allowing replay attacks.
**Learning:** Even with cryptographic signature validation (HMAC), lack of timestamp verification allows attackers to reuse captured valid data indefinitely.
**Prevention:** Always verify `auth_date` (or `exp`) when validating stateless authentication tokens or data.
