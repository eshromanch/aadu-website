# Client Domain Setup Guide
**Quick Reference for Adding New Client Domains**

## 🚀 **Adding New Client Domain**

### **Step 1: Add Domain to Mail Server**

1. **Access Admin Panel:**
   ```
   http://194.195.90.237:8080/admin/
   ```

2. **Navigate to Virtual Domains:**
   - Click `Virtual domains`
   - Click `Add Domain`
   - Enter: `client-domain.com`

3. **Generate DKIM Key:**
   - Click on the new domain
   - Note the DKIM selector (e.g., `s20250827106`)
   - Copy the DKIM DNS record

### **Step 2: DNS Configuration**

#### **SPF Record (Add to client's domain):**
```
Name: @
Type: TXT
Value: v=spf1 ip4:194.195.90.237 ~all
```

#### **DKIM Record (Add to client's domain):**
```
Name: [selector]._domainkey
Type: TXT
Value: [Copy from Poste.io admin panel]
```

### **Step 3: Create Email Accounts**

**In Poste.io Admin Panel:**
- Go to the client domain
- Click `Create a new email`
- Create accounts:
  - `contact@client-domain.com`
  - `info@client-domain.com`
  - `support@client-domain.com`
  - `admin@client-domain.com`

### **Step 4: Client Access Information**

#### **Webmail Access:**
```
URL: http://194.195.90.237:8080
Login: email@client-domain.com
```

#### **Email Client Settings:**
```
IMAP Server: 194.195.90.237
IMAP Port: 993 (SSL) or 143 (non-SSL)
SMTP Server: 194.195.90.237
SMTP Port: 587 (STARTTLS) or 25
Username: email@client-domain.com
```

#### **Mobile Setup:**
- **iPhone**: Settings → Mail → Add Account → Other
- **Android**: Email app → Add account → IMAP
- **Gmail App**: Add as "Other" provider

## ✅ **Verification Checklist**

- [ ] Domain added to mail server
- [ ] SPF record added to client DNS
- [ ] DKIM record added to client DNS
- [ ] Email accounts created
- [ ] Test email delivery
- [ ] Webmail access working
- [ ] Email client configuration tested

## 🔧 **Troubleshooting**

### **Email Delivery Issues:**
```bash
# Test DNS propagation
dig TXT client-domain.com @8.8.8.8
dig TXT [selector]._domainkey.client-domain.com @8.8.8.8
```

### **Common Issues:**
1. **DNS not propagated** - Wait 5-15 minutes
2. **DKIM selector mismatch** - Check email headers vs DNS
3. **Multiple TXT records** - Remove conflicting records

## 📞 **Client Handover**

### **Information to Provide:**
- Webmail URL and login credentials
- Email client configuration
- Mobile setup instructions
- Support contact information

**Status**: Ready for Client Onboarding 🎯
