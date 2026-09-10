// CyberShield question bank: 200 total, 50 per category (phishing, password, qr, scam).
// Batch 0 = the original 24 hand-crafted scenarios (unchanged).
// Batches 1-4 = 44 new questions per category (15 easy / 15 medium / 14 hard each),
// so every category lands at 17 easy / 17 medium / 16 hard.
// Schema per question: { category, prompt, options, correctAnswerIndex, explanation, difficulty }.
// Judgment categories use: "Legit — proceed" / "Suspicious — verify via official channel" / "Scam — delete & report".

export const ORIGINAL_QUESTIONS = [
  // ---------------- PHISHING (6) ----------------
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'From: support@amaz0n-secure.xyz | Subject: URGENT — Your account will be SUSPENDED in 2 hours! "Dear Custumer, unusal activity detected. Click http://amaz0n-security-login.xyz immediately and enter your password + OTP to avoid blocking."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Classic phishing: urgency ("2 hours"), misspelled brand ("amaz0n"), free (.xyz) domain, and a demand for password + OTP. Real companies never ask for both over a link.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'From: hr@company-portal.com (your real HR uses hr@company.com) | Subject: Updated Leave Policy — action required. "Please open the attached Updated_Leave_Policy.html and sign in with your work email to view."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Subtle lookalike-sender phish: one extra word in the domain and an HTML attachment harvesting logins. Confirm with HR over a known channel before opening.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'You clicked "Forgot password" on your Google account. You receive: From: no-reply@accounts.google.com | Subject: Password reset request. "Someone requested a reset. If this was you, continue at accounts.google.com; otherwise ignore this email." No attachments, no reply requested.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: you initiated it, the sender domain and link match the real accounts.google.com, and it asks nothing sensitive by reply. Always still check the URL before clicking.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'SMS from an unknown number: "Dear customer, your SBI net-banking OTP is 482913. Our executive will call shortly — please share this OTP with them for verification."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: banks and UPI apps never ask you to share an OTP with anyone, including "executives". Anyone asking for your OTP is a fraudster, full stop.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'A LinkedIn "recruiter" sends an interview invite with a link to view the "assignment brief". The link opens a page that looks like Google login at gooogle-drive-docs.com asking for your email password.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Credential-harvesting phish: the extra "o" in "gooogle" gives it away. Never type your password after following a third-party link — go to the real site directly.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'Internal IT notice on the company intranet: "MFA rollout starts Monday. No links — visit the IT helpdesk on floor 2 or open the MFA app already installed on your laptop to enrol."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit pattern: no clickable link, no credential request, and a verifiable in-person channel. Real IT announcements give you a way to confirm outside the message itself.',
  },

  // ---------------- PASSWORD (6) ----------------
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'Rate the strength of this password: "Rahul1998"',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 1,
    explanation:
      'Weak: a dictionary name plus a birth year is among the first guesses in every attack — personal details add almost zero strength.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt: 'Rate the strength of this password: "Tr7#kQ9!mZ2@xP"',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 3,
    explanation:
      'Strong: 13 random characters mixing upper, lower, digits, and symbols — far beyond brute-force and dictionary attacks.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'Which of these passwords is the WEAKEST?',
    options: ['password123', 'BlueTiger!47', 'qwerty2024!', 'X9#mP2$vL8&nQ'],
    correctAnswerIndex: 0,
    explanation:
      '"password123" tops every leaked-password list, so attackers try it first. "qwerty2024!" is also bad, but nothing beats the most-guessed password ever.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt: 'Rate the strength of this password: "P@ssw0rd"',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 1,
    explanation:
      'Weak: simple letter-to-symbol swaps ("a"→"@", "o"→"0") are in every cracking dictionary — it looks complex but falls instantly.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt: 'Which of these passwords is the STRONGEST?',
    options: ['diwali2024', 'MyDogTommy', 'Sunshine#2020', 'timber-leaf-orbit-copper-77'],
    correctAnswerIndex: 3,
    explanation:
      'A long multi-word passphrase wins: easy to remember, brutally hard to crack. The others are dictionary words with predictable tweaks.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'You use "Sunshine#2020" on 12 sites, including banking and email. What is the MAIN risk?',
    options: [
      'None — it has a symbol so it is safe everywhere',
      'One breached site exposes all 12 accounts',
      'It is too long to type on mobile',
      'Websites will force you to change it monthly',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Reuse is the killer: when (not if) one site leaks, attackers replay the same password everywhere. Use a unique password per site plus a manager.',
  },

  // ---------------- QR (6) ----------------
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'A flyer taped to a café table: "FREE coffee! Scan this QR and enter your bank account number + OTP to claim."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: no freebie ever needs your bank details or OTP. QR codes hide the destination, so free-reward QRs demanding sensitive data are always a trap.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'A restaurant table has a QR for its menu. Scanning opens menu-restaurantname.com (matches the printed name), shows the menu instantly, and asks for no login or payment.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: the domain matches the business, and it demands nothing sensitive. Still glance at the URL after scanning — that 2-second check is the whole skill.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'A parking meter has a QR sticker pasted OVER the original printed code. It opens pay-park-quickly.xyz asking for your card number, expiry, CVV, and an OTP.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: stickers covering original codes plus a lookalike domain plus card+OTP harvesting. Peel-check the code and pay in the official parking app instead.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'At a shop you scan the UPI QR to pay. Your app shows the payee as a random personal name (not the shop), and the cashier rushes you: "Hurry, network is slow, just press pay!"',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Stop and verify: swapped QR stickers are a common fraud, and rushing is pressure tactics. Confirm the payee name with the shopkeeper before paying.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'SMS: "Your parcel is held — redelivery in 24 hrs. Scan the QR / visit bit.ly/delhivery-redeliver and pay a ₹25 customs fee with your card." You were expecting no parcel.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Courier-fee scam: the tiny ₹25 is bait to harvest your card. Track parcels only in the official courier app, never via SMS links or QR codes.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'Your office event organiser (known email, confirmed on the team chat) shares a QR for check-in. It opens a form on your company domain asking only for your name.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: trusted sender confirmed over a second channel, company domain, minimal data asked. Sender + domain + minimal-data is the green-flag trio.',
  },

  // ---------------- SCAM (6) ----------------
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'UPI app notification: a COLLECT request from an unknown ID — "Lucky Draw! You won ₹50,000. Approve this ₹100 collect request to release your prize."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: receiving money never requires approving a collect request or paying anything — approving SENDS your ₹100 to the fraudster. Decline and report.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'SMS from an unknown number: "Dear SBI customer, your KYC has expired. Account will be BLOCKED today. Update immediately at http://sbi-kyc-update.in"',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Fake-KYC scam: banks never update KYC via SMS links, and the domain is not onlinesbi.com. Do KYC only at the branch or official app/website.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'SMS: "Your Delhivery parcel is held at the hub. Pay ₹30 redelivery fee now at delhivery-track-pay.xyz to avoid return." (You did not order anything.)',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Fake-delivery scam: the small fee harvests your card details, and the domain is a lookalike. Check your orders in the official app — unknown "parcels" are bait.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'WhatsApp message: "Work-from-home job! Earn ₹5,000/day doing simple tasks. Just pay ₹999 registration to start today. Limited slots!"',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Fake-job scam: legitimate employers never charge joining or registration fees — money flows to you, not from you. Upfront fees always mean fraud.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'SMS from registered sender ID "SBIBNK": "Rs.2,400 debited from A/c XX1234 on 10-Sep. If not done by you, call 1800-11-2211 (the bank\'s official helpline). No links included."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit pattern: registered sender ID, no clickable link, and directs you to the official helpline you can verify independently. Alerts inform; they never demand clicks.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'Phone call: "Hello, I am calling from your bank\'s fraud department. A suspicious transaction is happening right now — please tell me the OTP you just received so I can stop it."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Voice-phishing (vishing): real fraud teams never ask for your OTP — the OTP authorises the theft. Hang up and call your bank\'s official number yourself.',
  },
]

// Batch 1: 44 new phishing scenarios (15 easy / 15 medium / 14 hard).
export const EXTRA_PHISHING = [
  // ----- easy (15): obvious urgency, misspellings, prize bait -----
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'SMS from an unknown number: "Your PayTM wallet will be BLOCKED in 1 hour! Verify now at paytm-secure-kyc.xyz with your full card number + CVV."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: wallet apps never demand full card details over an SMS link, and the domain is not paytm.com. Verify inside the official app, never via the link.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'SMS: "Congratulations! You won a Tata Safari in the Jio lucky draw. Claim at jio-winners-claim.in by paying a ₹50 delivery fee." You never entered any draw.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Prize scam: real lotteries never notify winners by random SMS or charge a "delivery fee" to release prizes. The fee harvests your card details.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'Email with attachment "Invoice.exe" from an unknown sender: "INVOICE #INV-2091: pay ₹84,500 within 24 hours or face legal action. Open the attached file for details."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: threats plus an executable attachment from a stranger. Real invoices come as PDFs from known vendors — never open .exe files from email.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'Facebook message from a stranger: "Hello dear, is this you in this video?? Watch now: fb-security-check.xyz/login"',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Credential-harvesting phish: curiosity bait plus a lookalike domain asking for your login. Real Facebook links stay on facebook.com.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'SMS from a personal mobile number: "Power will be disconnected tonight at 9 PM due to unpaid bill. Pay immediately at bijli-bill-fast.xyz to avoid disconnection."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Disconnection scam: electricity boards send notices from registered sender IDs and never collect payment via random links from personal numbers. Check your bill in the official app.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'WhatsApp message: "Hi, I am calling from the HDFC loan department. You have a pre-approved ₹5 lakh loan. Just share your PAN, Aadhaar number and the OTP to proceed."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: banks never process loans over WhatsApp or ask for OTPs. Anyone combining "pre-approved loan" with document + OTP demands is harvesting your identity.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'Email from support@micorsoft365.com: "Your mailbox is 99% FULL. Click here within 24 hours to upgrade your storage quota or lose incoming emails."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Phish: "micorsoft" is misspelled, and real quota warnings appear inside your mail app, not via random links. Check storage in the app itself.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'SMS: "SBI Reward points worth ₹9,800 expiring TODAY! Redeem now: sbi-rewards-point.xyz" (sender is an unknown 10-digit number).',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Reward-points scam: banks notify from registered sender IDs like SBIBNK, never from personal numbers with lookalike links. Redeem only inside the official app.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'SMS: "PM-Kisan ₹6,000 installment BLOCKED due to incomplete land records. Verify immediately at pmkisan-verify-land.in"',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Government-scheme scam: official communication comes via the pmkisan.gov.in portal and registered IDs, never via SMS short-links demanding verification.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'Email: "You have received ₹25,000 via UPI from an unknown sender. Click here to ACCEPT the payment: upi-collect-approve.xyz"',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'UPI trap: genuine incoming money lands directly in your account — there is no "accept" link to click. The link triggers a collect request that DEDUCTS your money.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'Your bank\'s official app (installed from the Play Store, verified developer) shows an in-app alert: "New login from Chrome, Mumbai. Was this you?" with [Yes, it was me] [No, secure my account] buttons. No links or SMS involved.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: the alert lives inside the verified official app you installed yourself, with no external link. In-app security prompts from the real app are trustworthy — respond there.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'Email from "your-college-dean@gmail.com" (a free Gmail, not your college domain): "Urgent: buy 5 gift cards for tomorrow\'s event and email me the codes. I am in a meeting, cannot take calls."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Gift-card scam: authority figure + free email domain + urgency + "cannot take calls" (to block verification). Real deans never demand gift-card codes by email.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'Instagram DM from an account with 3 followers impersonating a celebrity: "You have been selected for a paid promotion. Deposit ₹2,000 collaboration fee to unlock the brand deal."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Advance-fee scam: real brand deals never ask creators to pay to unlock them, and impersonator accounts have few followers and no verification badge.',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'SMS: "Your Amazon order #402-7183 could not be delivered. Reschedule now: amazn-delivery-track.xyz" — but you have not ordered anything in months.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Delivery phish: "amazn" is misspelled, and you have no pending order. Track parcels only inside the official shopping app under "Your Orders".',
  },
  {
    category: 'phishing',
    difficulty: 'easy',
    prompt:
      'Telegram message from "HR Priya": "Part-time data-entry job, ₹8,000/day from home. Send your bank account number and Aadhaar scan to start earning today."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Job-data harvest: real employers verify identity through formal onboarding, never via Telegram document drops. Unrealistic pay plus document demands equals fraud.',
  },
  // ----- medium (15): plausible senders, mixed signals -----
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'Email from the correct domain "notifications@yourbank.com" (matches your bank) with no links: "We will NEVER ask for your OTP or password. If someone does, report it at the number on the back of your debit card."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit awareness notice: correct domain, zero links, zero credential requests, and it points you to a channel you can verify independently (the card back).',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'A food-delivery app notification (inside the official app): "Rate your last order to earn 50 reward coins." Tapping it opens the in-app rating screen. No external browser opens.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: the action stays entirely inside the official app you installed — no external link, no credential prompt. In-app engagement prompts are normal product behavior.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'Google Calendar invite from an unknown address: "Interview confirmation — join video call" with a "Join meeting" link pointing to meet-secure-interview.xyz instead of meet.google.com.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Calendar-invite phish: attackers abuse calendar invites to bypass spam filters, and the join link is a lookalike domain. Verify the meeting with the recruiter over a known channel first.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'A recruiter from a real, verifiable company emails you from the company domain about a genuine open role — but asks for your date of birth, bank account number and mother\'s maiden name "for the offer letter" before any interview.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Pause and verify: the company and role may be real, but sensitive personal data is only collected after selection through formal HR portals. Confirm the recruiter via the company switchboard.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'Your phone shows an MFA approval push: "Approve sign-in to your email? Location: Lagos, Nigeria." You are sitting at home in Hyderabad and did not sign in anywhere.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'MFA-fatigue attack: someone has your password and hopes you tap Approve out of habit. DENY it, then change the password and review active sessions immediately.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'Pop-up while browsing: "Your Chrome is outdated! Click here to install urgent security update ChromeSetup.exe" — but Chrome normally updates itself silently in the background.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Fake-update malware: browsers never distribute updates through random pop-ups with .exe files. Update only via the browser\'s own Settings → About page.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'Your company\'s password-expiry notice arrives by email: "Your password expires Friday. Change it ONLY via Settings on your office laptop — this email contains no links." It matches the policy announced in last month\'s town hall.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: no link, instructs a path you already know (office laptop settings), and matches a previously announced policy. Attackers cannot resist including a link — its absence is the tell.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'Reply to your own IT support ticket from the correct helpdesk address: "To fix the VPN, temporarily disable your antivirus and run this diagnostic tool from the link below."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Verify before obeying: ticket threads can be spoofed or hijacked, and no legitimate fix starts with "disable your antivirus". Call the helpdesk number to confirm this instruction.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'Shipping email for a laptop you DID order: sender "dispatch@bluedart-official.in", tracking link points to bluedart-track-shipment.xyz (not bluedart.com).',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'The order is real but the link is not: scammers scrape order details and send lookalike tracking. Paste the tracking ID into the official BlueDart site yourself instead of clicking.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'Conference Wi-Fi portal page: connects you to the internet after you enter just your name and email. The portal URL is the venue\'s own domain printed on the welcome banner.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit captive portal: minimal data (name/email for a guest pass), venue domain matches printed signage. Never enter passwords or OTPs on Wi-Fi portals, but a guest pass is normal.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'An OAuth screen after clicking "Sign in with Google" on a quiz app: "QuizMaster requests access to: READ your emails, SEND emails as you, ACCESS your contacts."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Consent phishing: a quiz app has no business reading or sending your email. Over-broad permissions are the attack — data access IS the payload. Deny and uninstall.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'Hotel booking confirmation email with a PDF attachment. You DID book this hotel yesterday on the official site, the booking ID matches, and the sender domain is the hotel chain\'s real domain.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: you initiated the transaction, the booking ID matches your records, and the sender domain is genuine. Expected attachments from verified transactions are normal.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'University email: "Merit scholarship applications open — apply ONLY through the student portal (link to portal.university.edu, your real portal). No documents needed at this stage." The notice is also pinned on the department notice board.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: real portal domain, no premature document demands, and corroborated by a physical notice board. Two independent channels agreeing is strong verification.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'Email that correctly references your recent complaint to an online store (order ID, item, date all accurate): "Refund approved. Confirm your bank details on this page to receive ₹4,200: store-refund-verify.xyz"',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Refund phish: scammers harvest complaint details from social media to sound convincing, but refunds go back to the original payment method — never via a "confirm bank details" link.',
  },
  {
    category: 'phishing',
    difficulty: 'medium',
    prompt:
      'LinkedIn message from a "procurement manager" at a company you actually supply to: "Please update your bank details for future payments using the attached vendor form and return it by email today."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Classic vendor-fraud setup: bank-detail changes are the highest-risk request in B2B email. Always confirm payment-detail changes by calling a known number — never by replying to the requesting email.',
  },
  // ----- hard (14): spear-phishing, lookalikes, session tricks -----
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'Email from "paypaI-support.com" (that is paypa-followed-by-capital-i, not paypal): "Unusual login detected. Verify your identity." The page design is a pixel-perfect copy of PayPal\'s.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Homograph attack: capital "i" renders almost identically to lowercase "L" in many fonts. Perfect design means nothing — only the true domain (paypal.com, typed by you) counts.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'Link in an SMS: "secure.hdfcbank.kyc-update.in/verify" — it starts with your bank\'s exact name "hdfcbank".',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Subdomain trap: the real domain is the LAST part before the first slash — "kyc-update.in", not hdfcbank. Attackers prepend trusted names as subdomains. Read domains right-to-left.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'A login popup appears INSIDE the shopping site you are browsing (same tab, same address bar showing the real site): a Google sign-in window asking for your Gmail password to "link accounts for faster checkout".',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Browser-in-browser attack: the "popup" is just page graphics — try dragging it outside the window and it will not move, because it is fake. Real SSO opens a separate, draggable browser window.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'After 6 unexpected MFA push notifications, you get a call: "Hi, this is IT support, we see failed logins on your account. Please approve the next prompt so we can secure it." The caller knows your full name and employee ID.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'MFA-fatigue plus vishing combo: names and IDs leak in breaches, so "knowing" them proves nothing. Real IT never asks you to approve a foreign login — hang up and call the published helpdesk number.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'A DocuSign email for a rental agreement you ARE currently signing: sender "dse@docusign-verify.net", document name matches, but your landlord never mentioned sending it this way.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Expected-document trap: timing makes it tempting, but real DocuSign mail comes from docusign.com/na2/na3 subdomains. Confirm with your landlord on a known number before signing.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'Long email thread with your actual supplier about a real pending order — then a NEW participant joins: "Quick update, our accounts team changed. Please remit the balance to this new account: ..." The writing style shifts noticeably.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Reply-chain hijack: attackers infiltrate real threads (via a compromised mailbox) and strike at payment time. Any bank-detail change mid-thread demands out-of-band voice confirmation.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'Google Drive "comment" notification: a colleague (real name, real photo) mentioned you: "@you please review the Q3 numbers" with a link to "drive-secure-docs.com" instead of drive.google.com.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Mention-notification phish: names and photos are trivially copied. Google Drive links always live on drive.google.com or docs.google.com — anything else is harvesting your session.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'Email from your CEO (correct name, correct company domain, no misspellings): "I am in back-to-back board meetings. Please process a ₹2,00,000 vendor payment today — details attached. Keep this confidential." You have never handled payments before.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Whaling traits: authority + secrecy + first-time unusual request + urgency. Display names and even domains can be spoofed. Verify verbally — walk to the person or call their known number.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'Airport lounge Wi-Fi named "Lounge_Premium_Free". On connecting, the captive portal asks for your email password to "authenticate lounge access".',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Evil-twin hotspot: anyone can broadcast a convincing network name, and no legitimate portal needs your EMAIL password. Ask staff for the exact official network name; use mobile data if unsure.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'Recruiter email referencing your actual current employer, role, and a real project from your LinkedIn: "We are hiring for exactly this stack. Let us schedule a call — meanwhile, run this coding assessment: assessment-portal.xyz (asks for GitHub + email login first)."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Spear-phish: public LinkedIn details make it feel personal, but legitimate assessments (HackerRank, Codility, company portals) never gate on harvested logins via lookalike domains. Verify the recruiter on LinkedIn + the company site.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'SMS with a shortened link "bit.ly/3xK92mP": "Your package customs clearance is pending. Pay duty to release." You ARE waiting for an international parcel.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Shortened links hide the destination — that is exactly why attackers love them when you expect a parcel. Never expand-and-pay from SMS; check duty status in the courier\'s official app with your tracking ID.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'Your team\'s IT admin posts in the official Slack #announcements channel (which you have used for months): "VPN maintenance tonight 10 PM – 12 AM. Disconnect and reconnect after midnight. No action or links needed from anyone."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: it arrives in a long-trusted internal channel, names a verifiable window, and demands no credentials, links, or risky action. Low ask plus trusted channel equals safe.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'Email stating: "Someone requested a change to your bank-registered mobile number. If this was NOT you, visit your home branch within 7 days. No links, no OTP needed." Sender domain matches your bank exactly.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'High-stakes alert, so treat it as unverified until confirmed: even with a matching domain, never act from the message alone for account-takeover-grade events. Confirm via the number on your card or a branch visit.',
  },
  {
    category: 'phishing',
    difficulty: 'hard',
    prompt:
      'A "security check" page after you typed your password on what looked like your bank site: "For verification, enter the OTP sent to your phone AND your ATM PIN." The URL shows a padlock icon.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Credential-stacking: banks never ask for ATM PINs online, and the padlock only means the connection is encrypted — even attacker sites get padlocks free. Close it and retype the bank URL yourself.',
  },
]

// Batch 2: 44 new password scenarios (15 easy / 15 medium / 14 hard).
export const EXTRA_PASSWORD = [
  // ----- easy (15) -----
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'Rate the strength of this password: "priya123"',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 0,
    explanation:
      'Very weak: a common name plus a tiny number sequence is cracked in seconds — attackers try name+number combos before anything else.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'An attacker gets one guess at your login. Which of these passwords falls FIRST?',
    options: ['Mumbai@2024', 'admin', 'Tiger$99!', 'vK8#qW2!zR5@tY'],
    correctAnswerIndex: 1,
    explanation:
      '"admin" ships as the factory default on countless routers and devices, so it is the single most-tried credential in automated attacks. Always change defaults.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'Your friend suggests using "July@2024" because it has a capital, a symbol and numbers. How strong is it really?',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 1,
    explanation:
      'Weak: month+year with one symbol is a fully predictable pattern — cracking tools generate every month/year/symbol combo automatically. Complexity theater, not security.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'Which of these is the STRONGEST password?',
    options: ['welcome123', 'Qwerty!@#', 'letmein2024', 'D7$fG2!kQ9@wX4#'],
    correctAnswerIndex: 3,
    explanation:
      'Only the random 15-character mix resists both dictionary and brute-force attacks. The other three all sit on top-leaked-password lists.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'Rate the strength of this 4-digit ATM PIN: "1234"',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 0,
    explanation:
      'Very weak: "1234" is the most common PIN on earth and the first guess at every stolen card. Never use sequences, birth years, or repeated digits.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'You stick a sticky note with your laptop password under your keyboard "so you never forget it". What is the MAIN risk?',
    options: [
      'The glue damages the keyboard',
      'Anyone with physical access — cleaner, colleague, visitor — owns your account',
      'Sticky notes expire after a year',
      'The password becomes weaker over time',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Physical access bypasses all digital security: whoever reads the note skips the password entirely. Use a password manager instead of paper.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'Rate the strength of this password: "iloveyou"',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 0,
    explanation:
      'Very weak: short, all-lowercase dictionary phrase, and permanently parked in every breach list. Length AND unpredictability both matter.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'Which of these is the WEAKEST choice for a new bank password?',
    options: ['Your own mobile number', 'A random 14-character string', 'A 5-word passphrase', 'A password-manager-generated password'],
    correctAnswerIndex: 0,
    explanation:
      'Your mobile number is semi-public (forms, directories, Truecaller-style lookups) and fully predictable. Banking passwords must be unique and unguessable.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'A website lets you create an account with a 3-character password and no other checks. What should you conclude?',
    options: [
      'Great — short passwords are convenient',
      'The site has weak security practices; avoid reusing any important password there',
      'Short passwords are stronger on fast sites',
      'Nothing — password length does not matter',
    ],
    correctAnswerIndex: 1,
    explanation:
      'A site tolerating 3-character passwords likely stores them poorly and gets breached easily. Never reuse your email or banking password on low-hygiene sites.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'Rate the strength of this password: "qwerty"',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 0,
    explanation:
      'Very weak: a keyboard walk, not a password. Cracking dictionaries include every keyboard pattern (qwerty, asdf, 1qaz) in the first thousand guesses.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'Your cousin asks for your streaming password "just to watch one match". What is the safest response?',
    options: [
      'Share it — you can change it later',
      'Share it but ask them not to share further',
      'Decline, or use the service\'s official profile-sharing / OTP-login feature instead',
      'Text it to them and delete the message',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Shared passwords get re-shared, and most people reuse them elsewhere. Official profile sharing or temporary OTP login gives access without exposing the credential.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'Which of these passwords is the STRONGEST?',
    options: ['cricketfan', 'Cricketfan1', 'CRICKETFAN2024!', 'correct-horse-staple-forest-42'],
    correctAnswerIndex: 3,
    explanation:
      'The 4-word passphrase with a number wins on length: ~30 characters of memorisable entropy beats every short "complex-looking" variant of one dictionary word.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'Rate the strength of this password: "AAAAAAA1!"',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 0,
    explanation:
      'Very weak: ticking the "one uppercase, one digit, one symbol" boxes with a repeated character fools policy checkers, not attackers — there is almost zero entropy here.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'You receive an email: "Confirm your Gmail password by replying to this message." The sender claims to be Google support. What should you do?',
    options: [
      'Reply with the password — it looks official',
      'Reply with a slightly wrong password to test them',
      'Never send passwords by email; report it as phishing',
      'Call the sender\'s number to verify first',
    ],
    correctAnswerIndex: 2,
    explanation:
      'No legitimate service ever collects passwords via email reply — email is unencrypted and forwardable. Password entry happens only on the real site you navigate to yourself.',
  },
  {
    category: 'password',
    difficulty: 'easy',
    prompt: 'Which is the WEAKEST way to back up your passwords?',
    options: ['A reputed password manager with a strong master password', 'Writing them in a notebook kept at home', 'Saving them in your phone\'s unprotected Notes app that syncs to cloud', 'Memorizing 3-4 unique passphrases'],
    correctAnswerIndex: 2,
    explanation:
      'Cloud-synced plain-text notes are searchable, synced to every logged-in device, and exposed in breaches — the worst of all worlds. A manager encrypts; paper at least stays offline.',
  },
  // ----- medium (15) -----
  {
    category: 'password',
    difficulty: 'medium',
    prompt: 'Rate the strength of this password: "Monsoon@2024!"',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 2,
    explanation:
      'Moderate: decent length and mixed classes, but season+year is a guessable pattern. Fine for low-value accounts; use random generation for email and banking.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt: 'Which of these holds up best against a cracking dictionary?',
    options: ['Chennai$uper123', 'Sunset-beach-party-99', 'dragon', '9h#K2$mV7@QwX1!'],
    correctAnswerIndex: 3,
    explanation:
      'The 16-character random string beats even a good passphrase here: the passphrase words are common collocates ("sunset beach party"), while randomness has no pattern to exploit.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt:
      'You use "Kaveri$1995" for email and "Kaveri$1995!" for banking (one extra character). What is the MAIN risk?',
    options: [
      'The exclamation mark is not allowed by some sites',
      'Attackers who learn one credential systematically try tiny variations on all your other accounts',
      'Short passwords expire faster',
      'Banking sites reject reused roots automatically',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Credential-tweaking attacks try exactly these mutations (append !, 1, year+1). One base password with small per-site tweaks collapses like full reuse once any site leaks.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt: 'Rate the strength of this password: "Trus7n0#2024Secure"',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 2,
    explanation:
      'Moderate: 17 characters with leet-speak ("Trus7n0") looks strong, but predictable substitutions add less entropy than they appear to. Length carries it to moderate, not strong.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt:
      'Your password manager can generate 20-character random passwords, but you worry: "What if the manager company gets hacked?" What is the correct reasoning?',
    options: [
      'Avoid managers entirely and reuse 2-3 passwords',
      'Managers use zero-knowledge encryption: a breach leaks encrypted vaults, crackable only via YOUR master password — still far safer than reuse',
      'Store passwords in browser instead — browsers never get breached',
      'Email passwords to yourself as backup',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Reputed managers encrypt locally with your master password and never hold the key — server breaches expose only ciphertext. Pair with a strong unique master password plus 2FA.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt: 'Which of these is the WEAKEST practice, even with a strong password?',
    options: [
      'Enabling app-based 2FA on the account',
      'Answering "security questions" (mother\'s maiden name, first school) truthfully on social media-visible facts',
      'Using a unique password per site',
      'Checking have-i-been-pwned style breach alerts',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Security questions are backup passwords with publicly researchable answers. Treat them as extra passwords: store random answers in your manager, never true facts.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt: 'Rate the strength of this password: "asdfghjkl;"',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 0,
    explanation:
      'Very weak: a full home-row keyboard walk. Length without randomness is worthless — pattern dictionaries crack this instantly despite its 9 characters.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt:
      'A site offers "Sign in with Google" versus creating a new password. For a random forum account, which is safer and why?',
    options: [
      'New password — fewer companies should hold your data',
      '"Sign in with Google" — one strong Google credential with 2FA beats yet another password you will likely reuse',
      'Both are equally risky',
      'Skip the account entirely',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Federated login concentrates risk in your hardened Google account (strong password + 2FA) and gives the forum no credential to leak. Fewer passwords to manage means less reuse.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt: 'Pick the STRONGEST password of the four:',
    options: ['54321countdown', 'Blue!Truck$Fly9', 'password!@#123', 'iloveindia2024'],
    correctAnswerIndex: 1,
    explanation:
      'Three unrelated words plus symbol and digit form a mini-passphrase with genuine unpredictability. The rest are dictionary words with trivial affixes.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt:
      'You enabled SMS-OTP 2FA on your bank account and reuse your email password on five shopping sites. An attacker breaches one shopping site. What happens next?',
    options: [
      'Nothing — SMS-OTP protects everything',
      'They try the leaked password on your email; if it works they intercept your SMS-OTPs via SIM-swap or notification preview and reach the bank',
      'Shopping sites automatically warn your bank',
      'The bank password changes itself',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Password reuse makes the email the weak link, and SMS-OTP falls to SIM-swap once the email is owned. Unique passwords per site plus app-based 2FA break this chain.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt: 'Rate the strength of this password: "Delhi-Metro-Blue-Line-2024"',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 3,
    explanation:
      'Strong: 25 characters of multi-word structure with digits — length dominates. Even though the words are related, the search space is far beyond practical cracking.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt:
      'Your office forces a password change every 30 days with "no reuse of last 10". You cope with "Company@Jan", "Company@Feb", … What is wrong?',
    options: [
      'Nothing — this satisfies the policy',
      'Predictable rotation is trivially guessable from any one leaked sample, and frequent forced changes push everyone toward weaker patterns',
      'Monthly changes are too infrequent',
      'Symbols should rotate too',
    ],
    correctAnswerIndex: 1,
    explanation:
      'One leak exposes the entire rotation scheme, and rotation fatigue weakens all passwords. Modern guidance (NIST SP 800-63B): long unique passwords, change only on suspected compromise.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt: 'Which of these is the WEAKEST second factor if your password leaks?',
    options: ['A hardware security key (FIDO2)', 'An authenticator app code (TOTP)', 'An SMS OTP to your number', 'A prompt in the bank\'s own registered app'],
    correctAnswerIndex: 2,
    explanation:
      'SMS OTPs can be intercepted via SIM-swap fraud at a mobile store with forged documents. App-based codes, push in the registered app, and hardware keys resist this.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt: 'Rate the strength of this password: "J@y$hr33"',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 1,
    explanation:
      'Weak: short name plus leet substitutions is a textbook dictionary entry ("jayshree" variants included). Leet-speak adds roughly one bit of real entropy per swap.',
  },
  {
    category: 'password',
    difficulty: 'medium',
    prompt:
      'A breach notification says your 8-character random password leaked from a forum. Your banking uses a DIFFERENT 16-character random password. What must you do?',
    options: [
      'Nothing at all',
      'Change the forum password and any site where you reused it; the unique banking password stays safe but enable 2FA everywhere as hygiene',
      'Close your bank account',
      'Change every password including banking to the same new one',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Uniqueness contains the blast radius: only the leaked credential and its reuses are burned. Rotate those, keep the uncompromised unique ones, and harden with 2FA.',
  },
  // ----- hard (14) -----
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'Your password manager\'s master password is "correct horse battery staple" (4 common words, 28 chars, no digits/symbols). A site forces "must include digit + symbol". You consider "correct horse battery staple 7!". What is the right call?',
    options: [
      'Keep the original — site rules add no real security anyway',
      'Comply minimally: the 4-word base already carries ~50 bits; appending " 7!" satisfies the checker while preserving memorability and strength',
      'Switch to "P@ssw0rd7!" to satisfy the checker simply',
      'Use the same master password as your email password for simplicity',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Entropy comes from the four random words (~11 bits each); the affix is just policy theater. Never weaken the memorable base or reuse the master password — it guards every credential you own.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'An attacker knows your password policy (12 chars, 1 uppercase, 1 digit) and that you "always end passwords with !2024". How much does that knowledge help them?',
    options: [
      'Not at all — the password is still 12+ characters',
      'Enormously: fixed suffixes and known structure collapse the search space to just the variable prefix, often under a few million guesses',
      'Only slightly — symbols still protect it',
      'It helps only against phishing, not cracking',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Cracking economics attack STRUCTURE first: masks like "?u?l?l?l?l?l?l!2024" reduce entropy to the unknown middle. Unpredictability across the whole string is what costs attackers.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'You find your exact email+password in a breach dump. The password is unique to that one forum and the forum holds no payment data. What is the correct response?',
    options: [
      'Ignore it — the forum is low-value',
      'Change that forum password, verify no reuse elsewhere, enable 2FA on your email, and watch for targeted phishing using the leaked pair',
      'Delete the forum account and consider the matter closed',
      'Change your email address everywhere',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Leaked pairs fuel credential-stuffing AND spear-phishing ("we know your password") extortion. Rotate the burned credential, confirm containment via uniqueness, and harden the email account attackers will target next.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'Two options for your primary email: (A) 11-character fully random "xQ9#mZ2!vLp4" memorised with effort, (B) 7-word diceware passphrase "candle arctic mango violin orbit zebra lamp" written on paper in your wallet. Which is safer overall?',
    options: [
      'A — random beats words, always',
      'A — paper can be stolen',
      'B — ~90 bits of entropy you will actually use beats 70 bits you will evade by reusing; wallet theft requires targeted physical access',
      'Both are equally bad',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Security you bypass is zero security: an unusable password gets reused or reset via weaker channels. Diceware passphrases maximise usable entropy; remote attackers (the real threat) cannot read your wallet.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'A site stores passwords with plain MD5 and no salt (discovered via its breach). Your password there was 18 random characters, unique. How worried should you be?',
    options: [
      'Not at all — 18 random characters cannot be cracked',
      'Very: unsalted MD5 runs at billions of guesses/second, so even strong passwords fall to brute force; rotate it anywhere reused and treat the site as compromised',
      'Only if the password contained dictionary words',
      'MD5 is fine for passwords',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Fast unsalted hashes let GPUs try the full keyspace at terrifying speed — storage hygiene matters as much as password strength. Uniqueness still saves your other accounts; rotate the exposed one.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'Your bank offers passkeys (FIDO2) as an alternative to password + SMS-OTP. What is the concrete security gain?',
    options: [
      'None — it is just convenience branding',
      'Passkeys are phishing-resistant: the private key never leaves your device and authentication is bound to the real site\'s domain, so fake sites get nothing usable',
      'Passkeys are longer passwords',
      'Passkeys remove the need for the bank to store anything',
    ],
    correctAnswerIndex: 1,
    explanation:
      'FIDO2 signs a challenge for the exact origin — a lookalike domain fails the check automatically, killing credential phishing and SIM-swap in one move. This is the upgrade path from passwords.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'You use "Amazon#2024!", "Flipkart#2024!", "IRCTC#2024!" — site-name plus fixed affix. An attacker breaches a small forum where you used "Forum#2024!". What can they infer?',
    options: [
      'Nothing — each password is different',
      'The exact pattern, letting them generate your Amazon/Flipkart/IRCTC passwords without any cracking',
      'Only the symbol policy',
      'Only that you shop online',
    ],
    correctAnswerIndex: 1,
    explanation:
      'One sample reveals the entire deterministic scheme. Pattern-passwords are a single credential wearing disguises — switch to independent random passwords via a manager.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'An app demands "at least 8 characters" with no maximum and blocks paste into the password field. How should you judge it?',
    options: [
      'Excellent — 8 characters is the gold standard',
      'Suspicious: paste-blocking breaks password-manager use and pushes users toward short memorable passwords; max-length absence is fine, but paste-blocking is a red flag for security maturity',
      'Paste-blocking makes passwords stronger',
      'Maximum length is what matters, not paste',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Paste-blocking is hostile to the single best habit (manager-generated long passwords) and signals outdated security thinking. Prefer services that welcome managers and long passphrases.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'Rate the strength of this password: "D0g................" (D-zero-g followed by 16 dots)',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 1,
    explanation:
      'Weak: 19 characters but nearly all repetition — entropy ≈ one short word plus a run-length. Attackers mask repeated-character runs early. Length must be unpredictable length.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'Your authenticator app holds TOTP codes for 30 accounts with no backup. Your phone falls in a lake. What was the missing practice?',
    options: [
      'Nothing — support desks always recover accounts',
      'Encrypted backup of TOTP seeds (or multi-device sync) plus printed recovery codes stored offline; without them, each account needs painful manual recovery',
      'Using SMS instead of app codes',
      'Taking screenshots of the codes',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Second factors need their own disaster recovery: encrypted cloud backup or exported seeds plus offline recovery codes. Losing all factors simultaneously can lock you out permanently.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'A "password strength meter" rates "P@ssw0rd123!" as STRONG (green bar, 100/100). Your assessment?',
    options: [
      'Trust the meter — it computed the score',
      'Distrust it: most meters count character classes, not guessability — this is a dictionary base with the world\'s most predictable affixes, cracked in seconds',
      'Add one more symbol to satisfy it fully',
      'Meters are always accurate for long passwords',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Naive meters reward leet-speak and affixes that cracking rules try first. Real estimators (e.g. zxcvbn-style) model attacker guesses — "P@ssw0rd123!" ranks near the bottom despite its green bar.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'You must choose ONE habit for relatives who will never use a manager: (A) one strong memorised password reused everywhere, (B) a notebook of unique random passwords at home, (C) "Sign in with Google" everywhere with a strong Google passphrase + 2FA. Best advice?',
    options: [
      'A — memorised reuse is simplest',
      'B — paper notebook of unique passwords',
      'C — federate to one hardened Google account: single strong credential with phishing-resistant 2FA, no per-site secrets to leak',
      'A and B are equivalent',
    ],
    correctAnswerIndex: 2,
    explanation:
      'For manager-refusers, federation concentrates defense on ONE account you can actually harden (passphrase + app 2FA), eliminating per-site password databases about them entirely. Pragmatic security beats idealised advice they will ignore.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'Rate the strength of this password: "7h3 qu1ck br0wn f0x" (leet-speak common phrase with spaces)',
    options: ['Very weak', 'Weak', 'Moderate', 'Strong'],
    correctAnswerIndex: 1,
    explanation:
      'Weak: the underlying phrase is one of the most-cracked strings in existence, and standard leet substitutions are pre-computed in every ruleset. Familiar phrases stay weak no matter the costume.',
  },
  {
    category: 'password',
    difficulty: 'hard',
    prompt:
      'After a breach, a site forces a reset but emails you YOUR OLD PASSWORD in plaintext "for reference". What does this prove, and what should you do?',
    options: [
      'Good service — convenient reference',
      'It proves reversible/plaintext storage: assume the password is fully compromised, never reuse it anywhere, and deprioritise the site\'s security promises going forward',
      'It proves strong encryption',
      'Just change it and trust the site',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Properly hashed passwords CANNOT be retrieved — emailing yours back proves negligent storage. Treat everything shared with that site as exposed and migrate important accounts away.',
  },
]

// Batch 3: 44 new QR (quishing) scenarios (15 easy / 15 medium / 14 hard).
export const EXTRA_QR = [
  // ----- easy (15) -----
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'A poster at a bus stop: "Govt subsidy ₹15,000! Scan to register with Aadhaar number + bank details + OTP." No government logo, just a mobile number at the bottom.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: subsidies never enroll via roadside QRs demanding Aadhaar plus OTP. Government schemes run through .gov.in portals and official centers only.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'A laminated QR stands at the billing counter of a well-known supermarket chain you shop at weekly. Scanning opens the chain\'s official site with today\'s offers. The tent card matches the store branding exactly.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: fixed in-store display at a trusted retailer, official domain, offers only — no credentials requested. Context plus domain plus zero data demand is the green trio.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'WhatsApp forward: "Mumbai Metro free travel pass! Scan this QR and enter your debit card details to activate lifetime free rides." Forwarded 6 times.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: "free lifetime" benefits that need card details are always bait, and multi-forwarded messages are untrusted by definition. Transit passes come from official counters and apps.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'A QR taped to an ATM that reads: "ATM out of cash? Scan to withdraw emergency cash — enter your PIN and the OTP to authorize."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: banks never issue cash via scanned QRs, and PIN plus OTP together hands over full account control. Use another ATM or the branch — never scan machine-side stickers.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'Your own home Wi-Fi router has a printed label: "Scan to join Guest Wi-Fi". Scanning connects your visitor\'s phone with no password typing.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: manufacturer-printed label on your own hardware, joining a network you control, zero credentials involved. Wi-Fi-share QRs on trusted devices are safe by design.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'A sticker on a temple donation box: "Donate online — scan here." Scanning opens a personal UPI ID (a random individual\'s name), not the temple trust\'s name.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: swapped donation stickers redirect offerings to fraudsters — the payee name is the giveaway. Donate at the counter or verify the trust\'s official UPI ID first.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'SMS: "Your electricity bill of ₹1,240 is due. Scan the QR below to pay instantly and get 10% cashback." The sender is an unknown personal number.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Bill-payment scam: discoms bill through their app/website and registered IDs, not personal-number SMS with cashback lures. Pay only in the official app.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'A wedding e-invite from your cousin (sent from her known number, family group confirms the wedding): a QR for the venue map. Scanning opens Google Maps at the wedding hall. Nothing else is asked.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: known sender confirmed by family, maps domain, zero data requested. A QR that only opens a map has nothing to steal.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'An auto-rickshaw has a QR with "Scan & pay" — but it is a paper printout taped over the original painted QR, and your app shows a personal name you do not recognize.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: taped-over QR plus unknown payee equals a swapped sticker. Pay only when the payee name matches the driver or vehicle owner — confirm verbally.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'A Facebook ad: "iPhone 16 Pro at 90% OFF! Scan to buy — only 3 left!" The QR opens a site that asks for full card details plus OTP before showing any seller information.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Shopping scam: impossible discounts plus upfront card+OTP harvesting with no verifiable seller. Buy flagships only from official stores or reputed marketplaces.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'Your office cafeteria price board has a printed QR: "View today\'s menu & give feedback". It opens an internal company form asking only for a star rating.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: fixed display in your workplace, company domain, minimal non-sensitive data. Feedback QRs that ask nothing personal are routine and safe.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'A QR slipped under your door: "Your society maintenance is overdue. Scan to pay ₹8,500 late fee immediately or water supply will be cut." You pay maintenance by bank transfer every month and got no notice in the society group.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: fear (water cut) plus an unusual payment channel contradicting your normal process and zero corroboration in the society group. Verify with the association before paying a rupee.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'A petrol pump\'s official digital display (built into the pump, not a sticker) shows a QR for payment. Your app shows the fuel station\'s registered business name.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: integrated hardware display (hard to tamper with) plus a matching registered business payee. Built-in screens beat stickers every time.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'Email: "Your courier return has been approved. Scan the QR to schedule pickup and pay a ₹99 reverse-logistics fee with your card." You never requested any return.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Return-fee scam: returns are scheduled inside the shopping app, and you requested nothing. Unknown "returns" plus card fees always mean harvesting.',
  },
  {
    category: 'qr',
    difficulty: 'easy',
    prompt:
      'A college fest poster with the official fest logo, also posted on the college\'s verified Instagram: "Scan to register for events." It opens a Google Form asking only for name, college and event choices.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: corroborated on the verified social account, minimal non-financial data, standard Google Form. Cross-channel confirmation is the key check, and it passes.',
  },
  // ----- medium (15) -----
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'A café table sticker offers "Free Wi-Fi — scan to connect". After scanning, the page asks for your Instagram login "to authenticate Wi-Fi access".',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: Wi-Fi access never requires a social-media login — the "authentication" is credential harvesting. Real guest Wi-Fi needs at most a name, mobile number, or OTP.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'At a toll plaza, the FASTag lane scanner fails. An attendant shows you a personal phone with a QR: "Pay toll here directly, sir, double the amount as penalty." The plaza has official FASTag readers and a helpdesk booth.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Skimming: tolls are collected via FASTag readers and official counters, never into an attendant\'s personal phone at penalty rates. Use the helpdesk booth for failed tags.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'A charity volunteer with an ID card shows a QR for flood-relief donations. The QR opens the well-known NGO\'s official donation page (domain matches their website), and the volunteer\'s ID matches the NGO\'s volunteer list on that site.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: official domain plus independently verifiable volunteer identity. For donations, verify the collector against the organisation\'s own published records.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'A "customer feedback" QR on your restaurant bill promises "a guaranteed ₹500 voucher". After scanning, it demands your credit card number "to verify identity before issuing the voucher".',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: feedback needs opinions, not card numbers — the oversized "guaranteed" reward exists to override that instinct. Real vouchers arrive as codes, never via card verification.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'Your doctor\'s clinic displays a QR for "digital prescriptions on WhatsApp". Scanning opens a wa.me link with the clinic\'s number pre-filled (matching the number on your appointment card). No login or payment is requested.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: the destination (clinic\'s own verified number) matches your independent record, and nothing sensitive is collected. Destination-checking is the whole skill, and it passes.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'A QR on a second-hand phone listing in a marketplace chat: "Scan to see more photos and the bill copy." It opens a file-download page asking you to install an "image viewer APK" from outside the Play Store.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Malware drop: photos need no APK, and sideloaded "viewers" are spyware or screen-recorders that steal OTPs. View photos in-chat; never install apps from seller links.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'An airport check-in kiosk screen (built-in display) shows a QR: "Continue check-in on your phone". Scanning opens the airline\'s official domain with your booking reference pre-filled.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: kiosk hardware plus official airline domain plus your own booking context. Handoff QRs on fixed infrastructure are standard and safe.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'A QR in a housing-society lift: "Society AGM on Sunday — scan to RSVP." It opens a form asking for flat number and number of attendees. The notice matches a message the secretary posted in the society group last week.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: corroborated by the secretary\'s earlier group message, minimal non-financial data. Matching an independent channel is exactly the verification step.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'A "scan to download our app" QR on a shopping website banner. Scanning downloads "shop-deals.apk" directly instead of opening the Play Store / App Store listing.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Sideload trap: legitimate apps link to official stores, where listings are vetted and updates are signed. Direct APKs bypass all of that — they can carry anything.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'Your friend messages: "Bro scan this QR, it\'s my new business UPI for the payment you owe me." The payee name matches your friend\'s full name, which you confirm by calling him.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit after verification: you confirmed the payee and the context over a voice call — a second channel. Payee-name plus voice confirmation is the correct protocol.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'A QR code arrives by email from your own contact: "Check out these vacation photos!" The link goes to photo-share-viewer.xyz and immediately asks for your email password to "verify you are human".',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Hijacked-contact phish: compromised accounts blast malicious QRs to all contacts, and no photo viewer needs your email password. Ask your contact out-of-band before touching it.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'Museum entry ticket (bought on the museum\'s official site) contains a QR for "audio guide". Scanning opens the museum\'s own domain audio player. No account or payment requested.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: ticket from the official seller, museum domain, content-only access. QRs that deliver content without collecting data are the safe baseline.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'A QR pasted on a public dustbin: "Municipal complaint portal — scan to report garbage issues." It opens a page asking for your full bank account number "for verification of residency".',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scam: civic complaints need a location and photos, never bank details. "Verification" demanding financial data is the universal harvesting pretext.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'A bookstore\'s QR for its loyalty program opens the store\'s official site and asks only for a mobile number to send the membership OTP — the same process the cashier describes at the counter.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: staff-described process matches the QR flow exactly, official domain, and OTPs only work inside the genuine signup. In-person corroboration seals it.',
  },
  {
    category: 'qr',
    difficulty: 'medium',
    prompt:
      'A "free health checkup camp" QR in your apartment complex asks you to upload your Aadhaar scan plus a live selfie "for registration" before revealing the camp date, venue, or organising hospital.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Verify first: real health camps publish organiser, venue and schedule upfront and collect ID only on-site. Identity documents before basic details is backwards — confirm with the RWA.',
  },
  // ----- hard (14) -----
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'On your laptop you open WhatsApp Web and the site shows a QR to link your phone — but the URL is "web-whatsapp-login.xyz", reached via a link in an email "sync your chats to the new desktop app".',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Session-hijack: scanning an attacker\'s pairing QR links YOUR account to THEIR browser, handing over all chats. WhatsApp Web lives only at web.whatsapp.com — type it yourself, never arrive via email.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'A crypto "airdrop" QR in a Telegram group: "Scan with your wallet app to claim 500 tokens." Scanning triggers a transaction asking you to "approve unlimited spending of USDT by SmartContract X".',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Wallet-drainer: "unlimited approval" transactions let the contract empty your wallet later. Never sign transactions you cannot explain, and never scan wallet QRs from chat groups.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'Your bank\'s official app has a "Scan & Pay" feature. A merchant QR scanned INSIDE the bank app shows the shop\'s registered business name, GST-verified badge, and the exact bill amount before you enter your UPI PIN.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: scanning inside the bank\'s own app keeps you in its verified rails — registered payee, verified badge, amount shown pre-PIN. This is the reference-safe QR flow.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'A QR on a "recharge your DTH here" sticker at a kirana store opens the DTH operator\'s genuine site but the page is HTTP (not HTTPS) and the sticker covers the store\'s printed QR.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Two conflicting signals: genuine domain but tampered placement and insecure transport. Do not pay through it — recharge in the operator\'s app and report the sticker.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'An email that perfectly mimics your airline (correct PNR, flight, seat from a booking you made) includes a QR for "priority boarding upgrade — pay ₹999". The QR opens upgrade-pay-travel.xyz.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Booking-data phish: PNRs leak via travel-agent mails and screenshots, so accurate details prove nothing. Ancillary purchases happen only inside "Manage Booking" on the airline\'s real site.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'A parking app\'s official "pay for guest" flow generates a QR on YOUR OWN phone screen, which your visitor scans to pay for their slot. No third-party sticker or link is involved.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: the QR originates inside the official app on a trusted device and encodes a session you created. Self-generated QRs in official apps carry no third-party risk.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'A QR inside a PDF "salary slip" emailed from your company\'s exact HR domain: "Scan to verify this payslip on the employee portal." The portal login page URL is hr-portal-verify.xyz.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Compromised-sender phish: the HR mailbox may be spoofed or breached, but the portal domain is definitively fake. Verify via the intranet portal you already use — never the emailed link.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'At a flea market, a stall\'s QR shows the seller\'s personal name (expected for a small vendor). The seller\'s Aadhaar-linked name on their displayed ID matches, and your friend paid the same QR yesterday successfully.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Mostly reassuring but still worth a pause: personal payees are normal for micro-vendors, yet stickers swap easily. Matching ID plus a known-good prior payment makes it acceptable — stay alert for tampering.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'A QR on your credit-card statement (paper statement received by post): "Scan to view reward points." It opens your bank\'s official domain rewards page after you log in normally.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: the QR arrives via the bank\'s established postal channel and resolves to its genuine domain. Channel provenance matters — mailed statements are far harder to forge at scale.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'A "scan to join the building\'s visitor-entry system" QR at a gated community asks visitors for name, flat being visited, AND a one-time "refundable ₹500 security deposit" via UPI to a personal ID.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Deposit-demand scam: visitor systems log entries; they never collect refundable deposits to personal IDs. Confirm with the resident you are visiting before paying anything.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'Two QRs side by side at a food truck: one weathered sticker matching the truck\'s name, one fresh glossy sticker with a different payee. The owner points to the weathered one: "Use the old one, the new one isn\'t mine."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'A second overlapping QR is the textbook swap-fraud setup — even with the owner\'s guidance, verify the payee name on-screen matches before paying, and tell the owner to remove the rogue sticker.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'A QR in your banking app\'s "offers" tab (inside the logged-in app) leads to a partner merchant discount page on the merchant\'s real domain. Checkout happens on the merchant site with your card.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: discovery happens inside the authenticated banking app and lands on the partner\'s genuine domain. Bank-curated partner links inherit the app\'s trust — still apply normal card hygiene at checkout.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'A conference badge QR ("scan to exchange contact") opens a vCard download. Your phone previews it: name, company, phone — plus an embedded URL to "portfolio-viewer.xyz" requesting a login.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Contact-exchange QRs are normal, but the bundled login-wall link is not. Save the contact details, ignore the portfolio link, and look the person up independently if interested.',
  },
  {
    category: 'qr',
    difficulty: 'hard',
    prompt:
      'Your child\'s school diary contains a QR for "fee payment" opening the school\'s known fee-portal domain. The school office verbally confirmed the same portal link at the parent meeting.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: printed diary (controlled distribution) plus known domain plus verbal confirmation at an in-person meeting. Triple corroboration is the gold standard.',
  },
]

// Batch 4: 44 new scam scenarios (15 easy / 15 medium / 14 hard).
export const EXTRA_SCAM = [
  // ----- easy (15) -----
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'Video call from "Mumbai Cyber Crime Branch": officers in uniform say a parcel in your name contains drugs. "Pay ₹75,000 immediately or we issue an arrest warrant. Keep this call secret."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      '"Digital arrest" scam: police never conduct arrests over video calls, demand secrecy, or collect fines via transfer. Real notices arrive in writing — hang up and report to cybercrime.gov.in.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'OLX buyer for your old sofa (listed ₹6,000): "I will pay ₹10,000 advance right now. Just scan this QR to RECEIVE the money." The QR screen shows "Pay ₹10,000" when you open it.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Marketplace QR scam: receiving money never needs a QR scan, and the screen literally says PAY. Overpayment plus receive-via-QR always means your money flows out.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'Message: "Your daughter is in an accident. Send ₹50,000 to this number NOW for emergency surgery. Do not call her — doctors said no phone." The number is unknown and the story is rushed.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Emergency-impersonation scam: panic plus "do not call" is designed to stop the one check that kills it. Always call your family member directly first — seconds of verification beat blind transfer.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'Call: "Congratulations! Your number won a ₹10 lakh Kaun Banega-style lottery. Pay 10% tax (₹1,00,000) in advance to release the prize." You never bought any ticket.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Advance-fee lottery scam: real winnings deduct tax at source — prizes never need upfront "tax" transfers, and you cannot win lotteries you never entered.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'Your bank\'s official app (logged in with your fingerprint) shows a banner: "RBI guideline update: never share OTPs. Read more." Tapping it opens an in-app info page. No links, no forms.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: awareness content inside the authenticated official app with no action demanded. Education banners that ask for nothing are safe to read.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'WhatsApp: "Part-time job liking YouTube videos, ₹150 per like, daily salary. Start now — first pay ₹500 activation for your task account."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Task-scam classic: tiny early payouts build trust, then "activation" and "recharge" fees drain lakhs. Any job demanding payment to work is fraud, full stop.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'Rental listing: a 3BHK in a prime area at one-third the market rent. Owner (unseen, "abroad") asks for 2 months\' advance via UPI "before someone else takes it" and refuses video calls.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Rental scam: too-good pricing plus advance pressure plus refusal of visual verification. Never pay for property you have not visited or verified through the society office.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'SMS: "Your FASTag wallet is blacklisted. Recharge instantly: fastag-recharge-urgent.xyz or your vehicle will be fined at tolls." Sender is a personal number.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'FASTag scam: issuers notify via registered IDs and their own app, not personal-number SMS. Check wallet status inside your bank/FASTag app directly.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'Call from "Microsoft Security": "Your computer is sending virus signals. Install AnyDesk so our engineer can clean it remotely." A pop-up with a warning appeared minutes earlier.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Tech-support scam: the pop-up and the call are the same gang\'s one-two punch, and remote-access tools hand them your screen, files and OTPs. Microsoft never cold-calls users.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'Matrimonial site match (unverified profile, model photos): within 3 days she proposes marriage, then: "My mother is hospitalised — please send ₹30,000 urgently, I will return it next week."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Romance scam: accelerated affection followed by an urgent money emergency is the textbook script. Never send money to someone you have not met in person and verified.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'Your mobile operator\'s registered sender ID texts: "Your plan expires in 3 days. Recharge via our official app or website." No link is included.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: registered sender ID, no clickable link, directs you to channels you already use. Expiry reminders inform; they never demand instant payment via link.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'Instagram ad: "Crypto doubling scheme — send 0.01 BTC, get 0.02 BTC back in 1 hour. Elon Musk live giveaway!" Comments are disabled.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Crypto-doubling scam: no one doubles money for free, celebrity names are stolen, and disabled comments hide victim warnings. Sent crypto is irreversible.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'SMS: "Your two-wheeler challan of ₹2,000 is pending. Pay now: traffic-challan-pay.xyz to avoid licence suspension." You can check challans on the official Parivahan portal.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Challan scam: real violations are verifiable on parivahan.gov.in and paid through official gateways. Random links with suspension threats harvest cards.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'Scholarship SMS: "National Merit Scholarship ₹50,000 sanctioned! Pay ₹1,200 processing fee at scholarship-disburse.in to release funds."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Scholarship-fee scam: genuine scholarships deduct nothing and disburse to bank accounts via DBT. "Fee to release funds" inverts the money flow — the hallmark of fraud.',
  },
  {
    category: 'scam',
    difficulty: 'easy',
    prompt:
      'Call: "I am from the income-tax department. Your PAN is linked to tax evasion. Pay ₹40,000 penalty via gift cards or face arrest tonight."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Tax-threat scam: the IT department communicates through the e-filing portal and formal notices, never demands gift cards, and never arrests by phone call.',
  },
  // ----- medium (15) -----
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'You searched "HDFC customer care" and called the top result. The "executive" asks you to install a screen-sharing app "to verify your account" before helping with a failed transaction.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Fake-care-number scam: scammers buy search ads above real listings, then use screen-sharing to watch you type credentials and OTPs. Call only the number printed on your card or official site.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'Your cousin\'s WhatsApp (same display photo, but the number has one digit different): "Hey! I changed my number. Urgently need ₹15,000 for a hospital deposit — will return tomorrow."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Changed-number money request is a hijack/impersonation red flag — but it COULD be genuine. Voice-call the OLD number (or a family member) before transferring a rupee.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'An IPO allotment message on a Telegram channel you joined: "Guaranteed allotment of the XYZ IPO at issue price! Transfer application money to this UPI ID before 5 PM."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'IPO scam: allotments happen only through ASBA in your bank/broker account with mandate approval — never via UPI transfers to individuals. "Guaranteed allotment" does not exist.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'Your bank calls from its official-looking number about a suspicious transaction. The caller reads out the last 4 digits of your card correctly and asks you to confirm the 3-digit CVV "for verification".',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Caller-ID is spoofable and card fragments leak in breaches — neither proves the bank. Banks NEVER ask for CVV or OTP. Hang up, call the number on your card, and ask about the transaction.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'A freelance client on a reputed platform (verified payment method, long history) asks to move communication to email for sharing large files, and pays the first milestone through the platform normally.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: verified platform history plus on-platform payment for real work. Moving file-sharing to email is normal; the danger line is moving PAYMENT off-platform — which has not happened.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'Loan app ad: "Instant ₹50,000 loan, no CIBIL check, 5-minute disbursal!" After installing, it demands access to your contacts, gallery and SMS before showing any loan terms.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Predatory loan-app trap: "no credit check" plus contact/SMS harvesting enables extortion (morphing photos, harassing contacts) when you cannot pay usurious rates. Borrow only from RBI-registered lenders.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'A courier company\'s official X (Twitter) account replies to your public complaint asking you to DM your tracking ID. Their handle has the gold verification badge and matches the company website link.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: verified business account cross-linked from the official website, and it asks only for a tracking ID (not bank data). Support escalation via verified handles is normal.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'You get a refund of ₹1,100 in your account from an unknown UPI ID, then a call: "Wrong transfer, please return it to this (different) number urgently."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Wrong-transfer fraud: stolen-money laundering uses your account as a mule — the "return" goes to a different ID. Do NOT return it yourself; ask your bank to reverse it to the SOURCE account.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'A "work from home" offer after a real video interview with a verifiable company: the role, salary and joining date all check out on the company site. HR asks you to buy a ₹4,500 "starter kit" from their vendor link before Day 1.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Offer-letter scam: everything can be staged up to the payment ask — legitimate employers provide equipment or deduct from payroll, never via vendor links. Verify through the company\'s published HR contact.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'Your credit-card company\'s app (logged in via biometrics) shows: "A lifetime-free upgrade is available on your card. Tap to view benefits." Tapping opens an in-app benefits page with no fee mentioned anywhere.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: inside the authenticated app, upgrade with explicitly lifetime-free terms. Card upgrades in-app with no fee and no external link are standard retention offers.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'Facebook Marketplace seller insists on advance for concert tickets: "Send ₹6,000 now, I will transfer the tickets to your name right after. Many buyers waiting." No buyer protection, no meetup offered.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Ticket scam: advance payment with zero protection and artificial scarcity. Use official resale platforms with guarantees, or meet at the venue box office to verify.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'An "electricity bill discount" agent at your door with a (photocopied) ID card offers 20% off if you pay this month\'s bill in cash to him directly instead of the app.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Doorstep-collection scam: discoms do not discount via cash-collecting agents with photocopied IDs. Pay through the official app and report the agent to the discom helpline.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'Your landlord (known number, you have paid for a year) texts: "Please send this month\'s rent to my new account — old one is frozen. Here are the new details."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Changed-bank-details is the highest-risk message type even from known contacts (SIM-swap, spoofed SMS). Confirm verbally or in person before changing a year-old payment routine.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'A job portal (reputed, where your resume is posted) forwards an interview invite: walk-in at the company\'s registered office address (matches Google Maps + company site) with original certificates. No fees mentioned.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: physical walk-in at a verifiable office with originals (which stay with you) and zero fees. Real hiring costs the candidate nothing but travel.',
  },
  {
    category: 'scam',
    difficulty: 'medium',
    prompt:
      'A DM: "I am a crypto trader with 3 years of verified profits. Invest ₹20,000 through my personal dashboard link — guaranteed 15% weekly returns. Withdraw anytime." The dashboard shows your balance growing daily.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Pig-butchering investment scam: "guaranteed" high returns plus a personal dashboard showing fake growth. Withdrawals mysteriously need "tax" top-ups until you stop paying. Real investing has risk and regulated platforms.',
  },
  // ----- hard (14) -----
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'Your father gets a call with YOUR cloned voice (AI voice-cloning from your Instagram reels): "Dad, I had an accident, please transfer ₹80,000 to the hospital account the doctor will share. Do not call me back, my phone is broken."',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'AI voice-clone scam: cloned voices defeat ear-verification, so families need a code-word protocol ("what is our safe word?") plus callback to a known number. Voice alone is no longer proof.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'A "SEBI-registered investment advisor" (shows a certificate screenshot) runs a WhatsApp group giving stock tips with 90% accuracy screenshots. Entry to the "premium signals" tier costs ₹25,000 via UPI.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Tip-scam: screenshots forge easily, and SEBI registration is verifiable on sebi.gov.in (it will not be there). Registered advisors never guarantee accuracy or collect via personal UPI.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'After you post a phone-for-sale ad, a "buyer" sends a courier agent to your door WITH cash for the full amount, inspects the phone, pays, and leaves. No links, no QR, no advance.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: cash-in-hand after physical inspection inverts the usual risk — you hold money before parting with goods. Verify notes are genuine and count them; the fraud patterns all involve YOU paying first.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'Your company\'s actual vendor (correct GST invoice, prior transaction history) emails new bank details from their real domain. The email references your real PO number and the usual signatory\'s name.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Even perfect-looking detail changes demand voice verification: vendor mailboxes get compromised precisely to send flawless-looking detail swaps. Call the vendor\'s published number before remitting.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'A dating-app match of 3 weeks (many video calls, consistent life details) asks you to jointly invest in a "low-risk forex platform her uncle built". The platform lets you withdraw small profits twice.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Pig-butchering romance scam: weeks of grooming plus small real withdrawals build the trap for the big deposit, which then needs endless "fees" to release. Video calls can be deepfaked or hired actors.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'You receive a court summons PDF on WhatsApp from an unknown number: "Hon\'ble Court summons you. Pay ₹15,000 settlement via this link to avoid arrest, or appear Monday." It cites a real case number format.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Fake-summons scam: courts serve summons physically or through eCourts (ecourts.gov.in) where the case number is verifiable — never via WhatsApp payment links. Look up the case number on the portal.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'Your housing society\'s AGM passes a resolution (minutes circulated, managing committee signatures) to collect ₹5,000 per flat for lift repair into the society\'s audited bank account. Collectors issue printed receipts.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: documented resolution, audited society account (not personal), and printed receipts. Collective decisions with paper trails into institutional accounts are verifiable governance, not fraud.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'A recruiter sends a genuine-looking offer letter (company CIN, address, HR contact all real) but the joining process requires a "refundable ₹25,000 security deposit" and the HR email is on a Gmail account.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Offer-letter fraud: scammers clone real company details but cannot fake the domain — genuine HR writes from corporate email and never takes deposits. Call the company switchboard to confirm.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'An "RBI officer" on a video call (uniformed, RBI backdrop, ID card shown) says your Aadhaar is linked to money laundering and instructs you to transfer savings to an "RBI safe account" for verification.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Escalated digital-arrest: uniforms, backdrops and IDs are stagecraft, and no "safe account" exists — RBI never holds individual deposits. Law enforcement never secures money by moving it.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'Your stockbroker\'s app (official, logged in) shows a corporate-action option: "Apply for the XYZ buyback — 50 shares." The buyback is also announced on the BSE website and the company\'s exchange filing.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: in-app action corroborated by exchange filings on bseindia.com. Regulated-market actions leave verifiable public trails — check the filing, then act inside the official app.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'A charity marathon you REGISTERED for emails (correct name, correct event, real organiser domain): "Due to a payment gateway issue, please re-pay the ₹800 entry via this alternate link: marathon-pay-alt.xyz".',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Real context, wrong link: event databases leak, and re-payment links are the exploit. Genuine gateway issues are resolved on the original site or announced on verified socials — confirm there first.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'A home-buyer WhatsApp group shares "RERA-approved project" documents with a registration number. The price is 20% below nearby projects and booking needs 10% token "this weekend only".',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 1,
    explanation:
      'Verify on the state RERA portal: registration numbers are forged on paper easily but authoritative online. Below-market pricing plus weekend-only pressure demands portal verification before any token.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'Your bank\'s relationship manager (known name, calls from the branch landline you have saved, discusses your real holdings accurately) invites you to a "portfolio review" at the branch with an ID card check at entry.',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 0,
    explanation:
      'Legit: saved landline, accurate non-public knowledge used conversationally (not demanded), and the meeting is at the branch with ID checks. In-person at a verified premises is the strongest channel.',
  },
  {
    category: 'scam',
    difficulty: 'hard',
    prompt:
      'A part-time "rating hotels on Google Maps" job pays ₹200/task for 5 tasks into your account. Task 6 requires "recharging ₹5,000 to unlock premium tasks with 3x commission".',
    options: ['Legit — proceed', 'Suspicious — verify via official channel', 'Scam — delete & report'],
    correctAnswerIndex: 2,
    explanation:
      'Task-scam escalation ladder: real micro-payouts fund trust for the recharge trap, after which "frozen funds need more deposit" spirals. The moment a job asks YOU for money, it is over — walk away.',
  },
]
