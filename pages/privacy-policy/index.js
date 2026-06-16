import FrontLayout from '@/components/layouts/FrontLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';


export default function PrivacyPolicy() {

    const serviceItems = [
        'Visit our website at https://vetezclaim.com, or any website of ours that links to this Privacy Notice',
        'Download and use our mobile application (VetEZ Claim), or any other application of ours that links to this Privacy Notice',
        'Engage with us in other related ways, including any sales, marketing, or events',
      ];
    
      const tocItems = [
        'WHAT INFORMATION DO WE COLLECT?',
        'HOW DO WE PROCESS YOUR INFORMATION?',
        'WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?',
        'DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?',
        'HOW DO WE HANDLE YOUR SOCIAL LOGINS?',
        'HOW LONG DO WE KEEP YOUR INFORMATION?',
        'HOW DO WE KEEP YOUR INFORMATION SAFE?',
        'DO WE COLLECT INFORMATION FROM MINORS?',
        'WHAT ARE YOUR PRIVACY RIGHTS?',
        'CONTROLS FOR DO-NOT-TRACK FEATURES',
        'DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?',
        'DORMANT ACCOUNT STATUS AND VETERAN DATA',
        'NOTIFICATION OF DATA BREACH',
        'DO WE MAKE UPDATES TO THIS NOTICE?',
        'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?',
        'HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?',
      ];
    
      const personalInfoItems = [
        'names',
        'phone numbers',
        'email addresses',
        'mailing addresses',
        'usernames',
        'passwords',
        'billing addresses',
        'contact preferences',
      ];
    
      const sensitiveInfoItems = [
        'health data',
        'biometric data',
        'social security numbers or other government identifiers',
      ];
    
      const appDataItems = [
        'Geolocation Information: We may request access or permission to track location-based information from your mobile device, either continuously or while you are using our mobile application(s), to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device\'s settings.',
        'Mobile Device Access: We may request access or permission to certain features from your mobile device, including your mobile device\'s calendar, camera, contacts, reminders, sms messages, storage, and other features. If you wish to change our access or permissions, you may do so in your device\'s settings.',
        'Mobile Device Data: We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server).',
        'Push Notifications: We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device\'s settings.',
      ];
    
      const autoCollectedItems = [
        'Log and Usage Data: Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files.',
        'Device Data: We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services.',
        'Location Data: We collect location data such as information about your device\'s location, which can be either precise or imprecise.',
      ];
    
      const processingItems = [
        'To facilitate account creation and authentication and otherwise manage user accounts.',
        'To deliver and facilitate delivery of services to the user.',
        'To respond to user inquiries/offer support to users.',
        'To send administrative information to you.',
        'To enable user-to-user communications.',
        'To protect our Services.',
        'To evaluate and improve our Services, products, marketing, and your experience.',
        'To identify usage trends.',
        'To comply with our legal obligations.',
      ];
    
      const sharingItems = [
        'Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.',
        'When we use Google Maps Platform APIs: We may share your information with certain Google Maps Platform APIs (e.g., Google Maps API, Places API).',
      ];
      const accountInfoItems = [
        'Log in to your account settings and update your user account.',
      ];
    

  return (
    <FrontLayout title="Privacy Policy">
      <Breadcrumb
        preUrl="/"
        preTitle="Home"
        currentTitle="Privacy Policy"
      />
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl dark:text-white-light">Privacy Policy</h1>
                <p className="text-center text-gray-600 mb-8 dark:text-white-light">Last updated August 30, 2024</p>

            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white text-gray-900 mt-10 rounded-lg shadow-lg p-10 dark:bg-gray-900 dark:text-white-light">

      <p className="mb-6 text-justify">
        This Privacy Notice for VetClaims Alliance, a nonprofit corporation (<span className="font-bold">we</span>, <span className="font-bold">us</span>, or <span className="font-bold">our</span>), operating VetEZ Claim, describes how and why we might access, collect, store, use, and/or share (&quot;process&quot;) your personal information when you use our services (<span className="font-bold">Services</span>), including when you:
      </p>

      <ul className="list-disc pl-6 mb-6">
        {serviceItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <p className="mb-6 text-justify">
        <span className="font-bold">Questions or concerns?</span> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at support@vetezclaim.com.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">SUMMARY OF KEY POINTS</h2>
      <p className="mb-6 text-justify">
        This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our <span className="underline">table of contents</span> below to find the section you are looking for.
        <br /><br />
        What personal information do we process? When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about <span className="underline">personal information you disclose to us.</span>
        <br /><br />
        Do we process any sensitive personal information? Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law. Learn more about <span className="underline">sensitive information we process.</span>
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">TABLE OF CONTENTS</h2>
      <ul className="list-decimal pl-6 mb-8">
        {tocItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. WHAT INFORMATION DO WE COLLECT?</h2>
      <h3 className="text-xl font-medium mt-6 mb-2">Personal information you disclose to us</h3>
      <p className="mb-6 text-justify">
        <span className="italic"><span className="font-bold">In Short:</span></span> We collect personal information that you provide to us.
        <br /><br />
        We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
        <br /><br />
        <span className="font-bold">Personal Information Provided by You.</span> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
      </p>
      <ul className="list-disc pl-6 mb-6">
        {personalInfoItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>
      <p className="mb-6 text-justify">
        <span className="font-bold">Sensitive Information.</span> When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information:
      </p>
      <ul className="list-disc pl-6 mb-6">
        {sensitiveInfoItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>
      <p className="mb-6 text-justify">
        <span className="font-bold">Payment Data.</span> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by Apple. You may find their privacy notice link(s) here: <span className="underline">https://www.apple.com/legal/privacy/en-ww/.</span>
      </p>
      <p className="mb-6 text-justify">
        <span className="font-bold">Social Media Login Data.</span> We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called <span className="underline">"HOW DO WE HANDLE YOUR SOCIAL LOGINS?"</span> below.
      </p>
      <p className="mb-6 text-justify">
        <span className="font-bold">Application Data.</span> If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:
      </p>
      <ul className="list-disc pl-6 mb-6">
        {appDataItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>
      <p className="mb-6 text-justify">
        This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.
        <br /><br />
        All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
      </p>

      <h3 className="text-xl font-medium mt-6 mb-2">Information automatically collected</h3>
      <p className="mb-6 text-justify">
        <span className="italic"><span className="font-bold">In Short:</span></span> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
        <br /><br />
        We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
        <br /><br />
        Like many businesses, we also collect information through cookies and similar technologies.
        <br /><br />
        The information we collect includes:
      </p>
      <ul className="list-disc pl-6 mb-6">
        {autoCollectedItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-2">Information collected from other sources</h3>
      <p className="mb-6 text-justify">
        <span className="italic"><span className="font-bold">In Short:</span></span> We may collect limited data from public databases, marketing partners, social media platforms, and other outside sources.
        <br /><br />
        In order to enhance our ability to provide relevant marketing, offers, and services to you and update our records, we may obtain information about you from other sources, such as public databases, joint marketing partners, affiliate programs, data providers, social media platforms, and from other third parties. This information includes mailing addresses, job titles, email addresses, phone numbers, intent data (or user behavior data), Internet Protocol (IP) addresses, social media profiles, social media URLs, and custom profiles, for purposes of targeted advertising and event promotion.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
      <p className="mb-6 text-justify">
        <span className="italic"><span className="font-bold">In Short:</span></span> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
        <br /><br />
        <span className="font-bold">We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</span>
      </p>
      <ul className="list-disc pl-6 mb-6">
        {processingItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
      <p className="mb-6 text-justify">
        <span className="italic"><span className="font-bold">In Short:</span></span> We may share information in specific situations described in this section and/or with the following third parties.
        <br /><br />
        We may need to share your personal information in the following situations:
      </p>
      <ul className="list-disc pl-6 mb-6">
        {sharingItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
      <p className="mb-6 text-justify">
        <span className="italic"><span className="font-bold">In Short:</span></span> We may use cookies and other tracking technologies to collect and store your information.
        <br /><br />
        We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
      <p className="mb-6 text-justify">
        <span className="italic"><span className="font-bold">In Short:</span></span> If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.
        <br /><br />
        Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
      <p className="mb-6 text-justify">
        <span className="italic"><span className="font-bold">In Short:</span></span> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.
        <br /><br />
        We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
      <p className="mb-6 text-justify">
        <span className="italic"><span className="font-bold">In Short:</span></span> We aim to protect your personal information through a system of organizational and technical security measures.
        <br /><br />
        We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
      <p className="mb-6 text-justify">
        <span className="italic"><span className="font-bold">In Short:</span></span> We do not knowingly collect data from or market to children under 18 years of age.
        <br /><br />
        We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
      <p className="mb-6 text-justify">
        <span className="italic"><span className="font-bold">In Short:</span></span> You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.
        <br /><br />
        <span className="underline"><span className="font-bold">Withdrawing your consent:</span></span> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time.
      </p>

      <h3 className="text-xl font-medium mt-6 mb-2">Account Information</h3>
      <p className="mb-6 text-justify">
        If you would at any time like to review or change the information in your account or terminate your account, you can:
      </p>
      <ul className="list-disc pl-6 mb-6">
        {accountInfoItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
      <p className="mb-6 text-justify">
        Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
      <p className="mb-6 text-justify">
        <span className="italic"><span className="font-bold">In Short:</span></span> If you are a resident of California, Colorado, Connecticut, Utah or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">12. DORMANT ACCOUNT STATUS AND VETERAN DATA</h2>
      <p className="mb-6 text-justify">
        A dormant account will be any account that has been registered, but not accessed by user login for a period of twelve months. If a user account becomes dormant, VetEZ Claim will inform the user at the user&apos;s registered email address that the account is dormant and will be deleted if the user does not login within thirty days of the notice. If the user does not login within thirty days of the notice, the account and 100% of Veteran data, including non-VA data, will be deleted.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">13. NOTIFICATION OF DATA BREACH</h2>
      <p className="mb-6 text-justify">
        In the event of a data breach in which a user's data is accessed by an unauthorized party, affected users will be notified via email at the email address used for account registration. Users will be informed if any actions are needed on their end to further prevent any breach of data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">14. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
      <p className="mb-6 text-justify">
        <span className="italic"><span className="font-bold">In Short:</span></span> Yes, we will update this notice as necessary to stay compliant with relevant laws.
        <br /><br />
        We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">15. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
      <p className="mb-6 text-justify">
        If you have questions or comments about this notice, you may email us at support@vetezclaim.com or contact us by post at:
        <br /><br />
        VetClaims Alliance (VetEZ Claim)<br />
        20 N Orange Ave Suite 1100<br />
        Orlando, FL 32801<br />
        United States
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">16. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
      <p className="mb-6 text-justify">
        Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law.
      </p>
    </div>
      


    </FrontLayout>
  );
}