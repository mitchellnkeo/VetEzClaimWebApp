import FrontLayout from '@/components/layouts/FrontLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';


export default function TermsConditions() {

    const tocItems = [
        'OUR SERVICES',
        'INTELLECTUAL PROPERTY RIGHTS',
        'USER REPRESENTATIONS',
        'USER REGISTRATION',
        'PURCHASES AND PAYMENT',
        'SUBSCRIPTIONS',
        'PROHIBITED ACTIVITIES',
        'USER GENERATED CONTRIBUTIONS',
        'CONTRIBUTION LICENSE',
        'MOBILE APPLICATION LICENSE',
        'SERVICES MANAGEMENT',
        'PRIVACY POLICY',
        'TERM AND TERMINATION',
        'MODIFICATIONS AND INTERRUPTIONS',
        'GOVERNING LAW',
        'DISPUTE RESOLUTION',
        'CORRECTIONS',
        'DISCLAIMER',
        'LIMITATIONS OF LIABILITY',
        'INDEMNIFICATION',
        'USER DATA',
        'ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES',
        'CALIFORNIA USERS AND RESIDENTS',
        'MISCELLANEOUS',
        'TRANSFER OF OWNERSHIP (INCLUDING MERGER, SALE OF THE COMPANY, ETC.)',
        'CONTACT US',
      ];
    
      const licenseItems = [
        'access the Services; and',
        'download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use.',
      ];
    
      const submissionItems = [
        'You confirm that you have read and agree with our "PROHIBITED ACTIVITIES". You will not post, send, publish, upload, or transmit through the Services any Submission that is not allowed. This includes any submission that is illegal, harassing, hateful, harmful, defamatory, or obscene. It also includes any submission that is bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading.',
        'To the extent permissible by applicable law, you waive any and all moral rights to any such Submission.',
        'You warrant that any Submission is original to you. Otherwise, you have the necessary rights and licenses to submit any Submissions and you have full authority to grant us the above-mentioned rights in relation to your Submissions.',
        'You warrant and represent that your Submissions do not constitute confidential information. You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all losses that we may suffer. This includes because of your breach of this section, any third party\'s intellectual property rights, or applicable law.',
      ];
    
      const userRepItems = [
        'all registration information you submit will be true, accurate, current, and complete;',
        'you will maintain the accuracy of such information and promptly update such registration information as necessary;',
        'you have the legal capacity and you agree to comply with these Legal Terms;',
        'you are not a minor in the jurisdiction in which you reside;',
        'you will not access the Services through automated or non-human means, whether through a bot, script or otherwise;',
        'you will not use the Services for any illegal or unauthorized purpose; and',
        'your use of the Services will not violate any applicable law or regulation.',
      ];
    
      const paymentItems = [
        'Visa',
        'Mastercard',
      ];
    
      const prohibitedItems = [
        'Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.',
        'Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.',
        'Circumvent, disable, or otherwise interfere with security-related features of the Services.',
        'Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.',
        'Use any information obtained from the Services in order to harass, abuse, or harm another person.',
        'Make improper use of our support services or submit false reports of abuse or misconduct.',
        'Use the Services in a manner inconsistent with any applicable laws or regulations.',
        'Engage in unauthorized framing of or linking to the Services.',
        'Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party\'s uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.',
        'Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering or extraction tools.',
        'Delete the copyright or other proprietary rights notice from any Content.',
        'Attempt to impersonate another user or person or use the username of another user.',
        'Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ("gifs"), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as "spyware" or "passive collection mechanisms" or "pcms").',
        'Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.',
        'Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.',
        'Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.',
        'Copy or adapt the Services\' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.',
        'Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.',
        'Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or other software.',
        'Use a buying agent or purchasing agent to make purchases on the Services.',
        'Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.',
        'Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.',
      ];
    
      const contributionItems = [
        'The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.',
        'You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.',
        'You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms.',
        'Your Contributions are not false, inaccurate, or misleading.',
        'Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.',
        'Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).',
        'Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.',
        'Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.',
        'Your Contributions do not violate any applicable law, regulation, or rule.',
        'Your Contributions do not violate the privacy or publicity rights of any third party.',
        'Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.',
        'Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.',
        'Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation.',
      ];
    
      const mobileAppItems = [
        'Decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the application;',
        'Make any modification, adaptation, improvement, enhancement, translation, or derivative work from the application;',
        'Violate any applicable laws, rules, or regulations in connection with your access or use of the application;',
        'Remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) posted by us or the licensors of the application;',
        'Use the application for any revenue-generating endeavor, commercial enterprise, or other purpose for which it is not designed or intended;',
        'Make the application available over a network or other environment permitting access or use by multiple devices or users at the same time;',
        'Use the application for creating a product, service, or software that is, directly or indirectly, competitive with or in any way a substitute for the application;',
        'Use the application to send automated queries to any website or to send any unsolicited commercial e-mail; or',
        'Use any proprietary information or any of our interfaces or our other intellectual property in the design, development, manufacture, licensing, or distribution of any applications, accessories, or devices for use with the application.',
      ];
    
      const servicesManagementItems = [
        'Monitor the Services for violations of these Legal Terms;',
        'Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities;',
        'In our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof;',
        'In our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and',
        'Otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.',
      ];

  return (
    <FrontLayout title="Terms and Conditions">
      <Breadcrumb
        preUrl="/"
        preTitle="Home"
        currentTitle="Terms and Conditions"
      />
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
          <div className="flex flex-col gap-2">
            
            <h1 className="text-2xl dark:text-white-light">Terms and Conditions</h1>
            <p className="text-gray-600 mb-8 dark:text-white-light">Last updated August 30, 2024</p>

         </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white text-gray-900 mt-10 rounded-lg shadow-lg p-10 dark:bg-gray-900 dark:text-white-light">
     
    

      <h2 className="text-2xl font-semibold mt-8 mb-4">AGREEMENT TO OUR LEGAL TERMS</h2>
      <p className="mb-6 text-justify">
        We are Vet EZ Claim LLC (<span className="font-bold">Company</span>, <span className="font-bold">we</span>, <span className="font-bold">us</span>), Suite 1100, Orlando, FL 32801.
      </p>
      <p className="mb-6 text-justify">
        We operate the mobile application Vet Ez Claim (the "App"), as well as any other related products and services that refer to or link to these legal terms (the <span className="font-bold">Legal Terms</span>) (collectively, the <span className="font-bold">Services</span>).
      </p>
      <p className="mb-6 text-justify">
        You can contact us by phone at (+1)2532795754, email at paul@vetezclaim.com, or by mail to 20 N Orange Ave Suite 1100, Orlando, FL 32801.
      </p>
      <p className="mb-6 text-justify">
        These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and Vet EZ Claim LLC, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. If you do not agree with all of these legal terms, then you are expressly prohibited from using the services and you must discontinue use immediately.
        <br /><br />
        We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon posting or notifying you from suppourt@vetezclaim.com, as stated in the email message. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.
        <br /><br />
        The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
        <br /><br />
        We recommend that you print a copy of these Legal Terms for your records.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">TABLE OF CONTENTS</h2>
      <ul className="list-decimal pl-6 mb-8">
        {tocItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. OUR SERVICES</h2>
      <p className="mb-6 text-justify">
        Our services intended for distribution where such services are allowed. Any individual or entity residing in a jurisdiction or country where distribution or use is not allowed, by law or regulation, is prohibited from using our services. All users are responsible for compliance with local laws when local laws are applicable.
        <br /><br />
        Our Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.). If your usage would be subject to such laws, you may not use our Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. INTELLECTUAL PROPERTY RIGHTS</h2>
      <h3 className="text-xl font-medium mt-6 mb-2">Our intellectual property</h3>
      <p className="mb-6 text-justify">
        We are the owner or the licensee of all intellectual property rights in our Services. This includes all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services ("Content"). It also includes any the trademarks, service marks, and logos contained therein ("Marks").
        <br /><br />
        Our Content and Marks are protected by copyright and trademark laws. This includes intellectual property rights and unfair competition laws and treaties in the United States and around the world.
        <br /><br />
        The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use only.
      </p>

      <h3 className="text-xl font-medium mt-6 mb-2">Your use of our Services</h3>
      <p className="mb-6 text-justify">
        Subject to your compliance with these Legal Terms, including the <span className="underline">"PROHIBITED ACTIVITIES"</span> section below, we grant you a non-exclusive, non-transferable, revocable license to:
      </p>
      <ul className="list-disc pl-6 mb-6">
        {licenseItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>
      <p className="mb-6 text-justify">
        Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied or reproduced. No part may be republished, uploaded, posted, publicly displayed, or encoded. No part may be translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever. Exceptions to this require our express prior written permission.
        <br /><br />
        If you want to make any use of the Services, Content, or Marks, please send your request to: suppourt@vetezclaim.com. This is for any use other than as set out in this section or elsewhere in our Legal Terms. If we grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks. You must also ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.
        <br /><br />
        We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
        <br /><br />
        Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms. Your right to use our Services will terminate immediately.
      </p>

      <h3 className="text-xl font-medium mt-6 mb-2">Your submissions</h3>
      <p className="mb-6 text-justify">
        Please review this section and the <span className="underline">"PROHIBITED ACTIVITIES"</span> section carefully prior to using our Services. This is so you understand the rights you give us and the obligations you have when you post or upload any content through the Services.
        <br /><br />
        <span className="font-bold">Submissions:</span> Directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services will be a "Submission". You agree to assign to us all intellectual property rights in any Submission. You agree that we shall own this Submission. We will be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
      </p>
      <p className="mb-6 text-justify">
        <span className="font-bold">You are responsible for what you post or upload:</span> By sending us Submissions through any part of the Services you will agree to the following.
      </p>
      <ul className="list-disc pl-6 mb-6">
        {submissionItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. USER REPRESENTATIONS</h2>
      <p className="mb-6 text-justify">
        By using the Services, you represent and warrant that:
      </p>
      <ul className="list-disc pl-6 mb-6">
        {userRepItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>
      <p className="mb-6 text-justify">
        If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. USER REGISTRATION</h2>
      <p className="mb-6 text-justify">
        You may be required to register with the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. PURCHASES AND PAYMENT</h2>
      <p className="mb-6 text-justify">
        We accept the following forms of payment:
      </p>
      <ul className="list-disc pl-6 mb-6">
        {paymentItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>
      <p className="mb-6 text-justify">
        You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in U.S. dollars.
        <br /><br />
        You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.
        <br /><br />
        We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. SUBSCRIPTIONS</h2>
      <p className="mb-6 text-justify">
        Billing Cycle. The subscription fee for the Services and/or any portion of the Services may be automatically renewed at the end of each defined period (each, a "Billing Cycle") unless you cancel your subscription or we cancel it. You must cancel your subscription before it renews to avoid billing of the next periodic subscription fee to your Account. We will bill the periodic subscription fee to the payment method you provide to us during registration (or to a different payment method if you change your payment information).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. PROHIBITED ACTIVITIES</h2>
      <p className="mb-6 text-justify">
        You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
      </p>
      <p className="mb-6 text-justify">
        As a user of the Services, you agree not to:
      </p>
      <ul className="list-disc pl-6 mb-6">
        {prohibitedItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. USER GENERATED CONTRIBUTIONS</h2>
      <p className="mb-6 text-justify">
        The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:
      </p>
      <ul className="list-disc pl-6 mb-6">
        {contributionItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. CONTRIBUTION LICENSE</h2>
      <p className="mb-6 text-justify">
        By posting your Contributions to any part of the Services, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in any media formats and through any media channels.
      </p>
      <p className="mb-6 text-justify">
        This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.
      </p>
      <p className="mb-6 text-justify">
        We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">10. MOBILE APPLICATION LICENSE</h2>
      <p className="mb-6 text-justify">Use License</p>
      <p className="mb-6 text-justify">
        If you access the Services via a mobile application, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the mobile application on wireless electronic devices owned or controlled by you, and to access and use the mobile application on such devices strictly in accordance with the terms and conditions of this mobile application license contained in these Legal Terms. You shall not:
      </p>
      <ul className="list-disc pl-6 mb-6">
        {mobileAppItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">11. SERVICES MANAGEMENT</h2>
      <p className="mb-6 text-justify">
        We reserve the right, but not the obligation, to:
      </p>
      <ul className="list-disc pl-6 mb-6">
        {servicesManagementItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">12. PRIVACY POLICY</h2>
      <p className="mb-6 text-justify">
        We care about data privacy and security. Please review our Privacy Policy: <span className="underline">https://vetezclaim.com/privacy-policy</span>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the United States. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Services, you are transferring your data to the United States, and you expressly consent to have your data transferred to and processed in the United States.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">13. TERM AND TERMINATION</h2>
      <p className="mb-6 text-justify">
        These Legal Terms shall remain in full force and effect while you use the Services. Without limiting any other provision of these Legal Terms, we reserve the right to, in our sole discretion and without notice or liability, deny access to and use of the Services (including blocking certain IP addresses), to any person for any reason or for no reason, including without limitation for breach of any representation, warranty, or covenant contained in these Legal Terms or of any applicable law or regulation. We may terminate your use or participation in the Services or delete your account and any content or information that you posted at any time, without warning, in our sole discretion.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">14. MODIFICATIONS AND INTERRUPTIONS</h2>
      <p className="mb-6 text-justify">
        We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We also reserve the right to modify or discontinue all or part of the Services without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.
      </p>
      <p className="mb-6 text-justify">
        We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">15. GOVERNING LAW</h2>
      <p className="mb-6 text-justify">
        These Legal Terms shall be governed by and defined following the laws of the United States. Vet EZ Claim LLC and yourself irrevocably consent that the courts of the United States shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">16. DISPUTE RESOLUTION</h2>
      <p className="mb-6 text-justify">
        Any legal action of whatever nature brought by either you or us (collectively, the "Parties" and individually, a "Party") shall be commenced or prosecuted in the state and federal courts located in the United States, and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction and forum non conveniens with respect to venue and jurisdiction in such state and federal courts. Application of the United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer Information Transaction Act (UCITA) are excluded from these Legal Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">17. CORRECTIONS</h2>
      <p className="mb-6 text-justify">
        There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">18. DISCLAIMER</h2>
      <p className="mb-6 text-justify">
        THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">19. LIMITATIONS OF LIABILITY</h2>
      <p className="mb-6 text-justify">
        IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOST DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">20. INDEMNIFICATION</h2>
      <p className="mb-6 text-justify">
        You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">21. USER DATA</h2>
      <p className="mb-6 text-justify">
        We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2>
      <p className="mb-6 text-justify">
        Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">23. CALIFORNIA USERS AND RESIDENTS</h2>
      <p className="mb-6 text-justify">
        If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">24. MISCELLANEOUS</h2>
      <p className="mb-6 text-justify">
        These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">25. TRANSFER OF OWNERSHIP (INCLUDING MERGER, SALE OF THE COMPANY, ETC.)</h2>
      <p className="mb-6 text-justify">
        In the event that the Company is involved in a merger, acquisition, or sale of all or a portion of its assets, you will be notified via email and/or a prominent notice on our website of any change in ownership or uses of your personal information, as well as any choices you may have regarding your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">26. CONTACT US</h2>
      <p className="mb-6 text-justify">
        In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
      </p>
      <p className="mb-6">
        <span className="font-bold">Vet EZ Claim LLC</span><br />
        <span className="font-bold">20 N Orange Ave Suite 1100</span><br />
        <span className="font-bold">Orlando, FL 32801</span><br />
        <span className="font-bold">United States</span><br />
        <span className="font-bold">Phone: (+1)2532795754</span><br />
        <span className="font-bold">suppourt@vetezclaim.com</span>
      </p>
    </div>
      


    </FrontLayout>
  );
}
