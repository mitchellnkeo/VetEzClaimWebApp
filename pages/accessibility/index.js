import FrontLayout from '@/components/layouts/FrontLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';


export default function Accessibility() {

    const tocItems = [
        'THE APPLICATION',
        'SCOPE OF LICENSE',
        'TECHNICAL REQUIREMENTS',
        'NO MAINTENANCE AND SUPPORT',
        'USE OF DATA',
        'USER-GENERATED CONTRIBUTIONS',
        'CONTRIBUTION LICENSE',
        'LIABILITY',
        'WARRANTY',
        'PRODUCT CLAIMS',
        'LEGAL COMPLIANCE',
        'CONTACT INFORMATION',
        'TERMINATION',
        'THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY',
        'INTELLECTUAL PROPERTY RIGHTS',
        'APPLICABLE LAW',
        'MISCELLANEOUS',
      ];
    
      const contributionItems = [
        'The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.',
        'You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Licensed Application, and other users of the Licensed Application to use your Contributions in any manner contemplated by the Licensed Application and this License Agreement.',
        'You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness or each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Licensed Application and this License Agreement.',
        'Your Contributions are not false, inaccurate, or misleading.',
        'Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.',
        'Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).',
        'Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.',
        'Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.',
        'Your Contributions do not violate any applicable law, regulation, or rule.',
        'Your Contributions do not violate the privacy or publicity rights of any third party.',
        'Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.',
        'Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.',
        'Your Contributions do not otherwise violate, or link to material that violates, any provision of this License Agreement, or any applicable law or regulation.',
      ];
    
      const productClaims = [
        'product liability claims;',
        'any claim that the Licensed Application fails to conform to any applicable legal or regulatory requirement;',
        'claims arising under consumer protection, privacy, or similar legislation, including in connection with Your Licensed Application\'s use of the HealthKit and HomeKit.',
      ];
    
      const contactInfo = [
        'VetClaims Alliance (VetEZ Claim)',
        '20 N Orange Ave Suite 1100, Orlando, FL 32801, USA',
        'Orlando, FL 32801',
        'United States',
        'suppourt@vetezclaim.com',
      ];
    

  return (
    <FrontLayout title="Accessibility">
      <Breadcrumb
        preUrl="/"
        preTitle="Home"
        currentTitle="Accessibility"
      />
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
            <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl dark:text-white-light">Accessibility</h1>
                    <p className="text-center text-gray-600 mb-8">Last updated February 23, 2024</p>
                </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white text-gray-900 mt-10 rounded-lg shadow-lg p-10 dark:bg-gray-900 dark:text-white-light">
     
     

      <p className="mb-6 text-justify">
        VetEZ Claim is licensed to You (End-User) by VetClaims Alliance, a nonprofit corporation, located and registered at 20 N Orange Ave Suite 1100, Orlando, FL 32801, USA, Orlando, Florida 32801, United States (<span className="font-bold">"Licensor"</span>), for use only under the terms of this License Agreement.
        <br /><br />
        By downloading the Licensed Application from Apple's software distribution platform ("App Store") and Google's software distribution platform ("Play Store"), and any update thereto (as permitted by this License Agreement), You indicate that You agree to be bound by all of the terms and conditions of this License Agreement, and that You accept this License Agreement. App Store and Play Store are referred to in this License Agreement as <span className="font-bold">"Services."</span>
        <br /><br />
        The parties of this License Agreement acknowledge that the Services are not a Party to this License Agreement and are not bound by any provisions or obligations with regard to the Licensed Application, such as warranty, liability, maintenance and support thereof. VetClaims Alliance, a nonprofit corporation, not the Services, is solely responsible for the Licensed Application and the content thereof.
        <br /><br />
        This License Agreement may not provide for usage rules for the Licensed Application that are in conflict with the latest <span className="underline">Apple Media Services Terms</span> and <span className="underline">Conditions</span> and <span className="underline">Google Play Terms of Service</span> (<span className="font-bold">"Usage Rules"</span>). VetClaims Alliance, a nonprofit corporation acknowledges that it had the opportunity to review the Usage Rules and this License Agreement is not conflicting with them.
        <br /><br />
        VetEZ Claim when purchased or downloaded through the Services, is licensed to You for use only under the terms of this License Agreement. The Licensor reserves all rights not expressly granted to You. VetEZ Claim is to be used on devices that operate with Apple's operating systems ("iOS" and "Mac OS") or Google's operating system ("Android").
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">TABLE OF CONTENTS</h2>
      <ul className="list-decimal pl-6 mb-8">
        {tocItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. OUR SERVICES</h2>
      <p className="mb-6 text-justify">
        VetEZ Claim (<span className="font-bold">"Licensed Application"</span>) is a piece of software created to complete forms and related items for user submission to various federal agencies or organizations — and customized for iOS and Android mobile devices (<span className="font-bold">"Devices"</span>). It is used to complete standard forms and related forms.
        <br /><br />
        Furthermore, it is used to track claim progress and submission.
        <br /><br />
        The Licensed Application is not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use this Licensed Application. You may not use the Licensed Application in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. SCOPE OF LICENSE</h2>
      <p className="mb-6 text-justify">
        2.1 You are given a non-transferable, non-exclusive, non-sublicensable license to install and use the Licensed Application on any Devices that You (End-User) own or control and as permitted by the Usage Rules, with the exception that such Licensed Application may be accessed and used by other accounts associated with You (End-User, The Purchaser) via Family Sharing or volume purchasing.
        <br /><br />
        2.2 This license will also govern any updates of the Licensed Application provided by Licensor that replace, repair, and/or supplement the first Licensed Application, unless a separate license is provided for such update, in which case the terms of that new license will govern.
        <br /><br />
        2.3 You may not share or make the Licensed Application available to third parties (unless to the degree allowed by the Usage Rules, and with the Licensor's prior written consent), sell, rent, lend, lease or otherwise redistribute the Licensed Application.
        <br /><br />
        2.4 You may not reverse engineer, translate, disassemble, integrate, decompile, remove, modify, combine, create derivative works or updates of, adapt, or attempt to derive the source code of the Licensed Application, or any part thereof (except with the Licensor's prior written consent).
        <br /><br />
        2.5 You may not copy (excluding when expressly authorized by this license and the Usage Rules) or alter the Licensed Application or portions thereof. You may create and store copies only on devices that You own or control for backup keeping under the terms of this license, the Usage Rules, and any other terms and conditions that apply to the device or software used. You may not remove any intellectual property notices. You acknowledge that no unauthorized third parties may gain access to these copies at any time. If you sell your Devices to a third party, you must remove the Licensed Application from the Devices before doing so.
        <br /><br />
        2.6 Violations of the obligations mentioned above, as well as the attempt of such infringement, may be subject to prosecution and damages.
        <br /><br />
        2.7 Licensor reserves the right to modify the terms and conditions of licensing.
        <br /><br />
        2.8 Nothing in this license should be interpreted to restrict third-party terms. When using the Licensed Application, You must ensure that You comply with applicable third-party terms and conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. TECHNICAL REQUIREMENTS</h2>
      <p className="mb-6 text-justify">
        3.1 The Licensed Application requires a firmware version 1.0.0 or higher. Licensor recommends using the latest version of the firmware.
        <br /><br />
        3.2 Licensor attempts to keep the Licensed Application updated so that it complies with modified/new versions of the firmware and new hardware. You are not granted rights to claim such an update.
        <br /><br />
        3.3 You acknowledge that it is Your responsibility to confirm and determine that the app end-user device on which You intend to use the Licensed Application satisfies the technical specifications mentioned above.
        <br /><br />
        3.4 Licensor reserves the right to modify the technical specifications as it sees appropriate at any time.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. NO MAINTENANCE OR SUPPORT</h2>
      <p className="mb-6 text-justify">
        4.1 VetClaims Alliance, a nonprofit corporation is not obligated, expressed or implied, to provide any maintenance, technical or other support for the Licensed Application.
        <br /><br />
        4.2 VetClaims Alliance, a nonprofit corporation and the End-User acknowledge that the Services have no obligation whatsoever to furnish any maintenance and support services with respect to the Licensed Application.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. USE OF DATA</h2>
      <p className="mb-6 text-justify">
        You acknowledge that Licensor will be able to access and adjust Your downloaded Licensed Application content and Your personal information, and that Licensor's use of such material and information is subject to Your legal agreements with Licensor and Licensor's privacy policy, which can be found at the bottom of the Licensed Application.
        <br /><br />
        You acknowledge that the Licensor may periodically collect and use technical data and related information about your device, system, and application software, and peripherals, offer product support, facilitate the software updates, and for purposes of providing other services to you (if any) related to the Licensed Application. Licensor may also use this information to improve its products or to provide services or technologies to you, as long as it is in a form that does not personally identify you.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. USER-GENERATED CONTRIBUTIONS</h2>
      <p className="mb-6 text-justify">
        The Licensed Application does not offer users to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or in the Licensed Application, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Licensed Application and through third-party websites or applications. As such, any Contributions you transmit may be treated in accordance with the Licensed Application Privacy Policy. When you create or make available any Contributions, you thereby represent and warrant that:
      </p>
      <ul className="list-decimal pl-6 mb-6">
        {contributionItems.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>
      <p className="mb-6 text-justify">
        Any use of the Licensed Application in violation of the foregoing violates this License Agreement and may result in, among other things, termination or suspension of your rights to use the Licensed Application.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. CONTRIBUTION LICENSE</h2>
      <p className="mb-6 text-justify">
        You agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).
        <br /><br />
        By submitting suggestions or other feedback regarding the Licensed Application, you agree that we can use and share such feedback for any purpose without compensation to you.
        <br /><br />
        We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area in the Licensed Application. You are solely responsible for your Contributions to the Licensed Application and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. LIABILITY</h2>
      <p className="mb-6 text-justify">
        8.1 Licensor's responsibility in the case of violation of obligations and tort shall be limited to intent and gross negligence. Only in case of a breach of essential contractual duties (cardinal obligations), Licensor shall also be liable in case of slight negligence. In any case, liability shall be limited to the foreseeable, contractually typical damages. The limitation mentioned above does not apply to injuries to life, limb, or health.
        <br /><br />
        8.2 Licensor takes no accountability or responsibility for any damages caused due to a breach of duties according to Section 2 of this License Agreement. To avoid data loss, You are required to make use of backup functions of the Licensed Application to the extent allowed by applicable third-party terms and conditions of use. You are aware that in case of alterations or manipulations of the Licensed Application, You will not have access to the Licensed Application.
        <br /><br />
        8.3 Licensor takes no accountability and responsibility in case of any user submission to various governmental organizations or agencies. It is the user's responsibility to ensure that submission properly occurs and that any and all forms are properly completed in accordance with the rules and regulations of the various governmental organizations or agencies that user chooses to submit forms or other items to.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. WARRANTY</h2>
      <p className="mb-6 text-justify">
        9.1 Licensor warrants that the Licensed Application is free of spyware, trojan horses, viruses, or any other malware at the time of Your download. Licensor warrants that the Licensed Application works as described in the user documentation.
        <br /><br />
        9.2 No warranty is provided for the Licensed Application that is not executable on the device, that has been unauthorizedly modified, handled inappropriately or culpably, combined or installed with inappropriate hardware or software, used with inappropriate accessories, regardless if by Yourself or by third parties, or if there are any other reasons outside of the Licensor's sphere of influence that affect the executability of the Licensed Application.
        <br /><br />
        9.3 You are required to inspect the Licensed Application immediately after installing it and notify VetClaims Alliance, a nonprofit corporation about issues discovered without delay by email provided in <span className="font-medium">Contact Information</span>. The defect report will be taken into consideration and further investigated if it has been emailed within a period of three (3) days after discovery.
        <br /><br />
        9.4 If we confirm that the Licensed Application is defective, VetClaims Alliance, a nonprofit corporation reserves a choice to remedy the situation either by means of solving the defect or substitute delivery.
        <br /><br />
        9.5 In the event of any failure of the Licensed Application to conform to any applicable warranty, You may notify the Services Store Operator, and Your Licensed Application purchase price will be refunded to You. To the maximum extent permitted by applicable law, the Services Store Operator will have no other warranty obligation whatsoever with respect to the Licensed Application, and any other losses, claims, damages, liabilities, expenses, and costs attributable to any negligence to adhere to any warranty.
        <br /><br />
        9.6 If the user is an entrepreneur, any claim based on faults expires after a statutory period of limitation amounting to twelve (12) months after the Licensed Application was made available to the user. The statutory periods of limitation given by law apply for users who are consumers.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">10. PRODUCT CLAIMS</h2>
      <p className="mb-6 text-justify">
        VetClaims Alliance, a nonprofit corporation and the End-User acknowledge that VetClaims Alliance, a nonprofit corporation, and not the Services, is responsible for addressing any claims of the End-User or any third party relating to the Licensed Application or the End-User's possession and/or use of that Licensed Application, including, but not limited to:
      </p>
      <ul className="list-decimal pl-6 mb-6">
        {productClaims.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">11. LEGAL COMPLIANCE</h2>
      <p className="mb-6 text-justify">
        You represent and warrant that You are not located in a country that is subject to a US Government embargo, or that has been designated by the US Government as a "terrorist supporting" country; and that You are not listed on any US Government list of prohibited or restricted parties.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">12. CONTACT INFORMATION</h2>
      <p className="mb-6 text-justify">
        For general inquiries, complaints, questions or claims concerning the Licensed Application, please contact:
      </p>
      <div className="mb-6">
        {contactInfo.map((item, index) => (
          <p key={index} className="mb-1">{item}</p>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">13. TERMINATION</h2>
      <p className="mb-6 text-justify">
        The license is valid until terminated by VetClaims Alliance, a nonprofit corporation or by You. Your rights under this license will terminate automatically and without notice from VetClaims Alliance, a nonprofit corporation if You fail to adhere to any term(s) of this license. Upon License termination, You shall stop all use of the Licensed Application, and destroy all copies, full or partial, of the Licensed Application.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">14. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY</h2>
      <p className="mb-6 text-justify">
        VetClaims Alliance, a nonprofit corporation represents and warrants that VetClaims Alliance, a nonprofit corporation will comply with applicable third-party terms of agreement when using Licensed Application.
        <br /><br />
        In Accordance with Section 9 of the "Instructions for Minimum Terms of Developer's End-User License Agreement," both Apple and Google and their subsidiaries shall be third-party beneficiaries of this End User License Agreement and — upon Your acceptance of the terms and conditions of this License Agreement, both Apple and Google will have the right (and will be deemed to have accepted the right) to enforce this End User License Agreement against You as a third-party beneficiary thereof.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">15. INTELLECTUAL PROPERTY RIGHTS</h2>
      <p className="mb-6 text-justify">
        VetClaims Alliance, a nonprofit corporation and the End-User acknowledge that, in the event of any third-party claim that the Licensed Application or the End-User's possession and use of that Licensed Application infringes on the third party's intellectual property rights, VetClaims Alliance, a nonprofit corporation, and not the Services, will be solely responsible for the investigation, defense, settlement, and discharge or any such intellectual property infringement claims.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">16. APPLICABLE LAW</h2>
      <p className="mb-6 text-justify">
        This License Agreement is governed by the laws of the State of Florida excluding its conflicts of law rules.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">17. MISCELLANEOUS</h2>
      <p className="mb-6 text-justify">
        17.1 If any of the terms of this agreement should be or become invalid, the validity of the remaining provisions shall not be affected. Invalid terms will be replaced by valid ones formulated in a way that will achieve the primary purpose.
        <br /><br />
        17.2 Collateral agreements, changes and amendments are only valid if laid down in writing. The preceding clause can only be waived in writing.
        <br /><br />
        17.3 The VetEZ Claim Application (App) is not associated with the Veterans Administration or any other federal agency. VetEZ Claim makes no guarantee that the provided forms are the most current or up-to-date copies of the forms provided in the application. The User is responsible for ensuring that all information that the Veterans Administration or any other federal agency requires in the form is complete and valid. Any indications that VetEZ Claim makes within the application that a specific item is "required" is merely illustrative in nature and is not a guarantee that such field is required, nor is a lack of indication for a field being required a guarantee that such field is not required.
      </p>
      </div>
      


    </FrontLayout>
  );
}
