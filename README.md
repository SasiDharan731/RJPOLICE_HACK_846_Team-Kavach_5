# Rajasthan Police Hackathon Project

🚀 **Registration ID: RJPOLICE_HACK_846**

## 🤝 Team Members
- 🌟 B. RohithKumar
- 🌟 R. Sasidharan (Leader)

### 📄 Idea Document - [Drive Link](https://drive.google.com/file/d/1q0AxfBAqZmZL_myWrxjrcs3yncAeE8Hx/view?usp=sharing)

## 🌐 Project Overview
### Problem Statement
**Automated AI/ML System for Detecting and Mitigating Online Fraud**

## 🚀 Project Status
The project is currently **under construction** and is being Dockerized for easy deployment.

### 🏆 Implemented features as of now
- 🎯 Implemented machine learning to detect phishing links.
- 🕵️ Extracted HTML from a site and performed analysis on the HTML content.

### 📝 Pending Works
- 🔗 Chrome extension
- 🌐 Web portal
- 🤖 WhatsApp bot
- ☎️ Phone validation
- 📧 Email validation
- 🖼️ Image analysis

## 🛠️ Instructions to Run the Project
The project is being **Dockerized** 🐬 for easy deployment. Stay tuned for further updates.

## 🎣 Phishing URL Detector
Our phishing URL detector checks various parameters to identify potential threats. Here are some of the parameters it checks:

- **UsingIp:** Returns 1 for a regular URL and -1 for an IP address.
- **longUrl:** Returns 1 for a URL with a length less than 54 characters, 0 for length between 54 and 75 characters, and -1 otherwise.
- **shortUrl:** Returns 1 for a non-shortened URL and -1 for common URL shortening services.
- **symbol:** Returns 1 for no "@" symbol in the URL and -1 if present.
- **redirecting:** Returns 1 for a URL with less than 6 forward slashes and -1 if more.
- **prefixSuffix:** Returns 1 for a domain without hyphens and -1 if hyphens are present.
- **SubDomains:** Returns 1 for a URL with one dot, 0 for two dots, and -1 otherwise.
- **Https:** Returns 1 for URLs using HTTPS and -1 otherwise.
- **DomainRegLen:** Returns 1 for a domain age greater than or equal to 12 months and -1 otherwise.
- **Favicon:** Returns 1 for a URL with a favicon and -1 otherwise.
- ... and more.

### 📌 Important Note:
- A value of 1 generally indicates a safe characteristic, while -1 suggests a potentially unsafe or suspicious attribute.

## 💻 Tech Stack
- ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
- ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
- ![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
- ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

**Note:** The project is still in progress 🚧, and more features and updates will be added. Stay tuned for further developments!