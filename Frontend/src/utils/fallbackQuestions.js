// Embedded tactical scenario pack: 24 questions across 4 categories.
// Guarantees standalone operation and resilience when backend is offline.
export const FALLBACK_QUESTIONS = {
  "phishing": [
    {
      "category": "phishing",
      "difficulty": "easy",
      "prompt": "From: support@amaz0n-secure.xyz | Subject: URGENT — Your account will be SUSPENDED in 2 hours! \"Dear Custumer, unusal activity detected. Click http://amaz0n-security-login.xyz immediately and enter your password + OTP to avoid blocking.\"",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Classic phishing: urgency (\"2 hours\"), misspelled brand (\"amaz0n\"), free (.xyz) domain, and a demand for password + OTP. Real companies never ask for both over a link.",
      "_id": "q-phishing-1"
    },
    {
      "category": "phishing",
      "difficulty": "hard",
      "prompt": "From: hr@company-portal.com (your real HR uses hr@company.com) | Subject: Updated Leave Policy — action required. \"Please open the attached Updated_Leave_Policy.html and sign in with your work email to view.\"",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Subtle lookalike-sender phish: one extra word in the domain and an HTML attachment harvesting logins. Confirm with HR over a known channel before opening.",
      "_id": "q-phishing-2"
    },
    {
      "category": "phishing",
      "difficulty": "medium",
      "prompt": "You clicked \"Forgot password\" on your Google account. You receive: From: no-reply@accounts.google.com | Subject: Password reset request. \"Someone requested a reset. If this was you, continue at accounts.google.com; otherwise ignore this email.\" No attachments, no reply requested.",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Legit: you initiated it, the sender domain and link match the real accounts.google.com, and it asks nothing sensitive by reply. Always still check the URL before clicking.",
      "_id": "q-phishing-3"
    },
    {
      "category": "phishing",
      "difficulty": "easy",
      "prompt": "SMS from an unknown number: \"Dear customer, your SBI net-banking OTP is 482913. Our executive will call shortly — please share this OTP with them for verification.\"",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Scam: banks and UPI apps never ask you to share an OTP with anyone, including \"executives\". Anyone asking for your OTP is a fraudster, full stop.",
      "_id": "q-phishing-4"
    },
    {
      "category": "phishing",
      "difficulty": "hard",
      "prompt": "A LinkedIn \"recruiter\" sends an interview invite with a link to view the \"assignment brief\". The link opens a page that looks like Google login at gooogle-drive-docs.com asking for your email password.",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Credential-harvesting phish: the extra \"o\" in \"gooogle\" gives it away. Never type your password after following a third-party link — go to the real site directly.",
      "_id": "q-phishing-5"
    },
    {
      "category": "phishing",
      "difficulty": "medium",
      "prompt": "Internal IT notice on the company intranet: \"MFA rollout starts Monday. No links — visit the IT helpdesk on floor 2 or open the MFA app already installed on your laptop to enrol.\"",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Legit pattern: no clickable link, no credential request, and a verifiable in-person channel. Real IT announcements give you a way to confirm outside the message itself.",
      "_id": "q-phishing-6"
    }
  ],
  "password": [
    {
      "category": "password",
      "difficulty": "easy",
      "prompt": "Rate the strength of this password: \"Rahul1998\"",
      "options": [
        "Very weak",
        "Weak",
        "Moderate",
        "Strong"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Weak: a dictionary name plus a birth year is among the first guesses in every attack — personal details add almost zero strength.",
      "_id": "q-password-7"
    },
    {
      "category": "password",
      "difficulty": "medium",
      "prompt": "Rate the strength of this password: \"Tr7#kQ9!mZ2@xP\"",
      "options": [
        "Very weak",
        "Weak",
        "Moderate",
        "Strong"
      ],
      "correctAnswerIndex": 3,
      "explanation": "Strong: 13 random characters mixing upper, lower, digits, and symbols — far beyond brute-force and dictionary attacks.",
      "_id": "q-password-8"
    },
    {
      "category": "password",
      "difficulty": "easy",
      "prompt": "Which of these passwords is the WEAKEST?",
      "options": [
        "password123",
        "BlueTiger!47",
        "qwerty2024!",
        "X9#mP2$vL8&nQ"
      ],
      "correctAnswerIndex": 0,
      "explanation": "\"password123\" tops every leaked-password list, so attackers try it first. \"qwerty2024!\" is also bad, but nothing beats the most-guessed password ever.",
      "_id": "q-password-9"
    },
    {
      "category": "password",
      "difficulty": "hard",
      "prompt": "Rate the strength of this password: \"P@ssw0rd\"",
      "options": [
        "Very weak",
        "Weak",
        "Moderate",
        "Strong"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Weak: simple letter-to-symbol swaps (\"a\"→\"@\", \"o\"→\"0\") are in every cracking dictionary — it looks complex but falls instantly.",
      "_id": "q-password-10"
    },
    {
      "category": "password",
      "difficulty": "medium",
      "prompt": "Which of these passwords is the STRONGEST?",
      "options": [
        "diwali2024",
        "MyDogTommy",
        "Sunshine#2020",
        "timber-leaf-orbit-copper-77"
      ],
      "correctAnswerIndex": 3,
      "explanation": "A long multi-word passphrase wins: easy to remember, brutally hard to crack. The others are dictionary words with predictable tweaks.",
      "_id": "q-password-11"
    },
    {
      "category": "password",
      "difficulty": "hard",
      "prompt": "You use \"Sunshine#2020\" on 12 sites, including banking and email. What is the MAIN risk?",
      "options": [
        "None — it has a symbol so it is safe everywhere",
        "One breached site exposes all 12 accounts",
        "It is too long to type on mobile",
        "Websites will force you to change it monthly"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Reuse is the killer: when (not if) one site leaks, attackers replay the same password everywhere. Use a unique password per site plus a manager.",
      "_id": "q-password-12"
    }
  ],
  "qr": [
    {
      "category": "qr",
      "difficulty": "easy",
      "prompt": "A flyer taped to a café table: \"FREE coffee! Scan this QR and enter your bank account number + OTP to claim.\"",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Scam: no freebie ever needs your bank details or OTP. QR codes hide the destination, so free-reward QRs demanding sensitive data are always a trap.",
      "_id": "q-qr-13"
    },
    {
      "category": "qr",
      "difficulty": "medium",
      "prompt": "A restaurant table has a QR for its menu. Scanning opens menu-restaurantname.com (matches the printed name), shows the menu instantly, and asks for no login or payment.",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Legit: the domain matches the business, and it demands nothing sensitive. Still glance at the URL after scanning — that 2-second check is the whole skill.",
      "_id": "q-qr-14"
    },
    {
      "category": "qr",
      "difficulty": "medium",
      "prompt": "A parking meter has a QR sticker pasted OVER the original printed code. It opens pay-park-quickly.xyz asking for your card number, expiry, CVV, and an OTP.",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Scam: stickers covering original codes plus a lookalike domain plus card+OTP harvesting. Peel-check the code and pay in the official parking app instead.",
      "_id": "q-qr-15"
    },
    {
      "category": "qr",
      "difficulty": "hard",
      "prompt": "At a shop you scan the UPI QR to pay. Your app shows the payee as a random personal name (not the shop), and the cashier rushes you: \"Hurry, network is slow, just press pay!\"",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Stop and verify: swapped QR stickers are a common fraud, and rushing is pressure tactics. Confirm the payee name with the shopkeeper before paying.",
      "_id": "q-qr-16"
    },
    {
      "category": "qr",
      "difficulty": "easy",
      "prompt": "SMS: \"Your parcel is held — redelivery in 24 hrs. Scan the QR / visit bit.ly/delhivery-redeliver and pay a ₹25 customs fee with your card.\" You were expecting no parcel.",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Courier-fee scam: the tiny ₹25 is bait to harvest your card. Track parcels only in the official courier app, never via SMS links or QR codes.",
      "_id": "q-qr-17"
    },
    {
      "category": "qr",
      "difficulty": "hard",
      "prompt": "Your office event organiser (known email, confirmed on the team chat) shares a QR for check-in. It opens a form on your company domain asking only for your name.",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Legit: trusted sender confirmed over a second channel, company domain, minimal data asked. Sender + domain + minimal-data is the green-flag trio.",
      "_id": "q-qr-18"
    }
  ],
  "scam": [
    {
      "category": "scam",
      "difficulty": "easy",
      "prompt": "UPI app notification: a COLLECT request from an unknown ID — \"Lucky Draw! You won ₹50,000. Approve this ₹100 collect request to release your prize.\"",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Scam: receiving money never requires approving a collect request or paying anything — approving SENDS your ₹100 to the fraudster. Decline and report.",
      "_id": "q-scam-19"
    },
    {
      "category": "scam",
      "difficulty": "medium",
      "prompt": "SMS from an unknown number: \"Dear SBI customer, your KYC has expired. Account will be BLOCKED today. Update immediately at http://sbi-kyc-update.in\"",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Fake-KYC scam: banks never update KYC via SMS links, and the domain is not onlinesbi.com. Do KYC only at the branch or official app/website.",
      "_id": "q-scam-20"
    },
    {
      "category": "scam",
      "difficulty": "medium",
      "prompt": "SMS: \"Your Delhivery parcel is held at the hub. Pay ₹30 redelivery fee now at delhivery-track-pay.xyz to avoid return.\" (You did not order anything.)",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Fake-delivery scam: the small fee harvests your card details, and the domain is a lookalike. Check your orders in the official app — unknown \"parcels\" are bait.",
      "_id": "q-scam-21"
    },
    {
      "category": "scam",
      "difficulty": "easy",
      "prompt": "WhatsApp message: \"Work-from-home job! Earn ₹5,000/day doing simple tasks. Just pay ₹999 registration to start today. Limited slots!\"",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Fake-job scam: legitimate employers never charge joining or registration fees — money flows to you, not from you. Upfront fees always mean fraud.",
      "_id": "q-scam-22"
    },
    {
      "category": "scam",
      "difficulty": "hard",
      "prompt": "SMS from registered sender ID \"SBIBNK\": \"Rs.2,400 debited from A/c XX1234 on 10-Sep. If not done by you, call 1800-11-2211 (the bank's official helpline). No links included.\"",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Legit pattern: registered sender ID, no clickable link, and directs you to the official helpline you can verify independently. Alerts inform; they never demand clicks.",
      "_id": "q-scam-23"
    },
    {
      "category": "scam",
      "difficulty": "hard",
      "prompt": "Phone call: \"Hello, I am calling from your bank's fraud department. A suspicious transaction is happening right now — please tell me the OTP you just received so I can stop it.\"",
      "options": [
        "Legit — proceed",
        "Suspicious — verify via official channel",
        "Scam — delete & report"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Voice-phishing (vishing): real fraud teams never ask for your OTP — the OTP authorises the theft. Hang up and call your bank's official number yourself.",
      "_id": "q-scam-24"
    }
  ]
};
