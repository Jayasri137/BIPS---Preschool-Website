import React from 'react';
import SEO from '../SEO';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-gray-800">
      <SEO title="Privacy Policy" description="Privacy Policy for Bluestone International Preschool." />
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#74207E]">PRIVACY POLICY FOR BIPS</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: 14 July 2026</p>

      <p className="mb-6 leading-relaxed">
        This Privacy Policy explains how Bluestone International Preschool ("we", "our", or "us") collects, uses, stores, and protects information when users access and use the BIPS Mobile Application ("App").
      </p>
      <p className="mb-6 leading-relaxed">
        By accessing or using the application, users agree to the collection and use of information in accordance with this Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#74207E]">1. Application and Developer Information</h2>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-gray-300 text-left">
          <tbody>
            <tr className="border-b"><td className="py-2 px-4 font-semibold border-r">Application Name</td><td className="py-2 px-4">BIPS</td></tr>
            <tr className="border-b"><td className="py-2 px-4 font-semibold border-r">Application ID (Package Name)</td><td className="py-2 px-4">com.bluestone.preschool</td></tr>
            <tr className="border-b"><td className="py-2 px-4 font-semibold border-r">Google Play Developer Name</td><td className="py-2 px-4">BGOI</td></tr>
            <tr className="border-b"><td className="py-2 px-4 font-semibold border-r">Operating Organization</td><td className="py-2 px-4">Bluestone International Preschool</td></tr>
            <tr className="border-b"><td className="py-2 px-4 font-semibold border-r">Website</td><td className="py-2 px-4"><a href="https://bluestoneinternationalpreschool.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://bluestoneinternationalpreschool.com</a></td></tr>
            <tr className="border-b"><td className="py-2 px-4 font-semibold border-r">Contact Email</td><td className="py-2 px-4"><a href="mailto:info@bluestoneinternationalpreschool.com" className="text-blue-600 hover:underline">info@bluestoneinternationalpreschool.com</a></td></tr>
            <tr><td className="py-2 px-4 font-semibold border-r">Business Address</td><td className="py-2 px-4">Sankari Main Road, Vettukadu, Konganapuram, Erumaipatti, Tamil Nadu – 637102</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mb-6 leading-relaxed">
        BIPS is an educational mobile application designed for students, parents, teachers, faculty members, and administrative staff associated with Bluestone International Preschool and its educational programs.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#74207E]">2. Information We Collect</h2>
      
      <h3 className="text-xl font-medium mt-6 mb-3 text-orange-500">2.1 Personal Information</h3>
      <p className="mb-4">The following information may be collected directly from users or provided by school administrators:</p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Full Name</li>
        <li>Email Address</li>
        <li>Phone Number</li>
        <li>Profile Photograph (Optional)</li>
        <li>Student Name</li>
        <li>Date of Birth</li>
        <li>Gender</li>
        <li>Grade or Class Information</li>
        <li>Parent or Guardian Details</li>
        <li>Login Credentials and Authentication Information</li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-3 text-orange-500">2.2 Device and Usage Information</h3>
      <p className="mb-4">Certain information may be collected automatically to improve application functionality, performance, and security, including:</p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Device Model and Manufacturer</li>
        <li>Operating System Version</li>
        <li>Unique Device Identifiers</li>
        <li>Application Usage Statistics</li>
        <li>User Interaction Logs</li>
        <li>Performance Reports</li>
        <li>Crash Reports and Diagnostic Information</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#74207E]">3. Application Permissions</h2>
      <p className="mb-4">To provide core educational services, the application may request access to certain device permissions. Users may manage or revoke these permissions at any time through their device settings.</p>
      
      <h3 className="text-xl font-medium mt-6 mb-3 text-orange-500">3.1 Internet Access (android.permission.INTERNET)</h3>
      <p className="mb-2">This permission is used to:</p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Connect securely to application servers</li>
        <li>Synchronize educational data</li>
        <li>Load content and notifications</li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-3 text-orange-500">3.2 Camera Access (android.permission.CAMERA)</h3>
      <p className="mb-2">This permission is used to:</p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Capture and upload profile pictures</li>
        <li>Submit assignments or homework images</li>
        <li>Share classroom activities and educational content</li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-3 text-orange-500">3.3 Storage Access (READ_EXTERNAL_STORAGE and WRITE_EXTERNAL_STORAGE)</h3>
      <p className="mb-2">This permission is used to:</p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Upload educational documents and images</li>
        <li>Download reports and PDF documents</li>
        <li>Store educational resources locally on the device</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#74207E]">4. How We Use Information</h2>
      <p className="mb-4">The information collected is used for the following purposes:</p>
      
      <h4 className="text-lg font-medium mt-4 mb-2">Educational Services</h4>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Creating and managing user accounts</li>
        <li>Providing educational and institutional services</li>
        <li>Maintaining student records</li>
      </ul>

      <h4 className="text-lg font-medium mt-4 mb-2">Communication</h4>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Facilitating communication between parents, teachers, and administrators</li>
        <li>Sending announcements and important updates</li>
      </ul>

      <h4 className="text-lg font-medium mt-4 mb-2">Notifications</h4>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Delivering push notifications related to school activities</li>
        <li>Providing reminders and event updates</li>
      </ul>

      <h4 className="text-lg font-medium mt-4 mb-2">Security</h4>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Preventing unauthorized access</li>
        <li>Monitoring suspicious activities</li>
        <li>Protecting user accounts and information</li>
      </ul>

      <h4 className="text-lg font-medium mt-4 mb-2">Support and Improvement</h4>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Resolving technical issues</li>
        <li>Improving application performance</li>
        <li>Enhancing user experience</li>
      </ul>

      <h4 className="text-lg font-medium mt-4 mb-2">Legal Compliance</h4>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Meeting legal, regulatory, and statutory obligations</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#74207E]">5. Information Sharing and Disclosure</h2>
      <p className="mb-4 leading-relaxed">
        Bluestone International Preschool does not sell, rent, or trade personal information to third parties. Information may only be shared in the following circumstances:
      </p>

      <h4 className="text-lg font-medium mt-4 mb-2">Service Providers</h4>
      <p className="mb-4 leading-relaxed">
        We may share information with trusted service providers, including hosting, database, analytics, and notification service providers such as Google Firebase services, solely for the purpose of operating and improving the application.
      </p>

      <h4 className="text-lg font-medium mt-4 mb-2">Legal Requirements</h4>
      <p className="mb-6 leading-relaxed">
        Information may be disclosed if required by applicable laws, legal proceedings, court orders, or governmental authorities.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#74207E]">6. Data Security and Encryption</h2>
      <p className="mb-4">We implement industry-standard security measures to protect personal information.</p>
      
      <h4 className="text-lg font-medium mt-4 mb-2">Encryption in Transit</h4>
      <p className="mb-4">All communication between the application and backend servers is secured using HTTPS/TLS encryption.</p>

      <h4 className="text-lg font-medium mt-4 mb-2">Data Protection Measures</h4>
      <p className="mb-2">We employ administrative, technical, and physical safeguards to protect against:</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Unauthorized access</li>
        <li>Data loss</li>
        <li>Data alteration</li>
        <li>Misuse of personal information</li>
      </ul>

      <h4 className="text-lg font-medium mt-4 mb-2">Security Disclaimer</h4>
      <p className="mb-6 leading-relaxed">
        Although we take reasonable steps to protect user information, no electronic storage or transmission system can guarantee absolute security.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#74207E]">7. Data Retention</h2>
      <p className="mb-2">Personal information is retained only for as long as necessary to:</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Provide educational services</li>
        <li>Maintain institutional records</li>
        <li>Fulfill legal and regulatory obligations</li>
      </ul>
      <p className="mb-6 leading-relaxed">
        When information is no longer required, it is securely deleted, anonymized, or archived in accordance with applicable laws and institutional policies.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#74207E]">8. Account and Data Deletion (Google Play Compliance)</h2>
      <p className="mb-4">BIPS respects users' rights regarding their personal information.</p>

      <h4 className="text-lg font-medium mt-4 mb-2">Requesting Account Deletion</h4>
      <p className="mb-4">Users may request deletion of their account and associated personal information at any time.</p>

      <h4 className="text-lg font-medium mt-4 mb-2">Contact for Deletion Requests</h4>
      <p className="mb-4">
        Please send an email to <a href="mailto:info@bluestoneinternationalpreschool.com" className="text-blue-600 hover:underline">info@bluestoneinternationalpreschool.com</a> with the subject line: <strong>"Account Deletion Request"</strong>
      </p>

      <h4 className="text-lg font-medium mt-4 mb-2">Information Required</h4>
      <p className="mb-2">Please include the following details in the request:</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Full Name</li>
        <li>Registered Email Address</li>
        <li>Student ID or Parent ID (if applicable)</li>
      </ul>

      <h4 className="text-lg font-medium mt-4 mb-2">Processing Timeline</h4>
      <p className="mb-6 leading-relaxed">
        Following successful identity verification, account information and personal data will be permanently deleted within 30 days, except where retention is required by law or institutional policies.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#74207E]">9. Children's Privacy</h2>
      <p className="mb-4">BIPS is specifically designed for educational institutions serving children.</p>

      <h4 className="text-lg font-medium mt-4 mb-2">Account Creation Policy</h4>
      <p className="mb-2">Children under the age of 13 are not permitted to create accounts independently. All child accounts must be created, managed, and authorized by:</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>A Parent or Legal Guardian, or</li>
        <li>Authorized School Administrators</li>
      </ul>

      <h4 className="text-lg font-medium mt-4 mb-2">Consent Requirements</h4>
      <p className="mb-4 leading-relaxed">
        We do not knowingly collect personal information directly from children under 13 without appropriate consent from parents, guardians, or educational institutions.
      </p>

      <h4 className="text-lg font-medium mt-4 mb-2">Removal of Unauthorized Data</h4>
      <p className="mb-6 leading-relaxed">
        If we become aware that information has been collected from a child without proper authorization, such information will be removed promptly.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#74207E]">10. Third-Party Services</h2>
      <p className="mb-2">The application may utilize third-party services that collect limited information necessary for functionality and analytics. These services may include:</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Google Play Services</li>
        <li>Firebase Analytics</li>
        <li>Firebase Crashlytics</li>
        <li>Firebase Cloud Messaging (FCM)</li>
      </ul>
      <p className="mb-6 leading-relaxed">Each service operates under its own privacy policy and terms of service.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#74207E]">11. International Data Transfers</h2>
      <p className="mb-6 leading-relaxed">
        Information may be processed or stored on servers located outside a user's country or state of residence. By using the application, users consent to such transfers, provided they comply with applicable data protection regulations and security standards.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#74207E]">12. Changes to This Privacy Policy</h2>
      <p className="mb-4 leading-relaxed">
        Bluestone International Preschool reserves the right to modify or update this Privacy Policy at any time. Changes become effective immediately upon publication within the application or on the official website.
      </p>
      <p className="mb-6 leading-relaxed">
        Users are encouraged to review this policy periodically to remain informed about how their information is protected.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#74207E]">13. Contact Information</h2>
      <p className="mb-4">For questions, concerns, or requests related to this Privacy Policy, please contact:</p>
      <ul className="list-disc pl-6 space-y-2 mb-8">
        <li><strong>Organization / School:</strong> Bluestone International Preschool</li>
        <li><strong>App Developer:</strong> BGOI</li>
        <li><strong>Email:</strong> <a href="mailto:info@bluestoneinternationalpreschool.com" className="text-blue-600 hover:underline">info@bluestoneinternationalpreschool.com</a></li>
        <li><strong>Website:</strong> <a href="https://bluestoneinternationalpreschool.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://bluestoneinternationalpreschool.com</a></li>
        <li><strong>Address:</strong> Sankari Main Road, Vettukadu, Konganapuram, Erumaipatti, Tamil Nadu – 637102</li>
      </ul>

      <div className="border-t pt-6 mt-8">
        <p className="text-center text-gray-500">
          © 2026 Bluestone International Preschool. All Rights Reserved.
        </p>
      </div>

    </div>
  );
};

export default PrivacyPolicy;
