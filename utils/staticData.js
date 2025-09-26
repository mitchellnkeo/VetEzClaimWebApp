export const StateData = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
    selected: false,
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
    selected: false,
  },
  {
    name: 'American Samoa',
    abbreviation: 'AS',
    selected: false,
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
    selected: false,
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR',
    selected: false,
  },
  {
    name: 'California',
    abbreviation: 'CA',
    selected: false,
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
    selected: false,
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT',
    selected: false,
  },
  {
    name: 'Delaware',
    abbreviation: 'DE',
    selected: false,
  },
  {
    name: 'District Of Columbia',
    abbreviation: 'DC',
    selected: false,
  },
  {
    name: 'Federated States Of Micronesia',
    abbreviation: 'FM',
    selected: false,
  },
  {
    name: 'Florida',
    abbreviation: 'FL',
    selected: false,
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
    selected: false,
  },
  {
    name: 'Guam',
    abbreviation: 'GU',
    selected: false,
  },
  {
    name: 'Hawaii',
    abbreviation: 'HI',
    selected: false,
  },
  {
    name: 'Idaho',
    abbreviation: 'ID',
    selected: false,
  },
  {
    name: 'Illinois',
    abbreviation: 'IL',
    selected: false,
  },
  {
    name: 'Indiana',
    abbreviation: 'IN',
    selected: false,
  },
  {
    name: 'Iowa',
    abbreviation: 'IA',
    selected: false,
  },
  {
    name: 'Kansas',
    abbreviation: 'KS',
    selected: false,
  },
  {
    name: 'Kentucky',
    abbreviation: 'KY',
    selected: false,
  },
  {
    name: 'Louisiana',
    abbreviation: 'LA',
    selected: false,
  },
  {
    name: 'Maine',
    abbreviation: 'ME',
    selected: false,
  },
  {
    name: 'Marshall Islands',
    abbreviation: 'MH',
    selected: false,
  },
  {
    name: 'Maryland',
    abbreviation: 'MD',
    selected: false,
  },
  {
    name: 'Massachusetts',
    abbreviation: 'MA',
    selected: false,
  },
  {
    name: 'Michigan',
    abbreviation: 'MI',
    selected: false,
  },
  {
    name: 'Minnesota',
    abbreviation: 'MN',
    selected: false,
  },
  {
    name: 'Mississippi',
    abbreviation: 'MS',
    selected: false,
  },
  {
    name: 'Missouri',
    abbreviation: 'MO',
    selected: false,
  },
  {
    name: 'Montana',
    abbreviation: 'MT',
    selected: false,
  },
  {
    name: 'Nebraska',
    abbreviation: 'NE',
    selected: false,
  },
  {
    name: 'Nevada',
    abbreviation: 'NV',
    selected: false,
  },
  {
    name: 'New Hampshire',
    abbreviation: 'NH',
    selected: false,
  },
  {
    name: 'New Jersey',
    abbreviation: 'NJ',
    selected: false,
  },
  {
    name: 'New Mexico',
    abbreviation: 'NM',
    selected: false,
  },
  {
    name: 'New York',
    abbreviation: 'NY',
    selected: false,
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC',
    selected: false,
  },
  {
    name: 'North Dakota',
    abbreviation: 'ND',
    selected: false,
  },
  {
    name: 'Northern Mariana Islands',
    abbreviation: 'MP',
    selected: false,
  },
  {
    name: 'Ohio',
    abbreviation: 'OH',
    selected: false,
  },
  {
    name: 'Oklahoma',
    abbreviation: 'OK',
    selected: false,
  },
  {
    name: 'Oregon',
    abbreviation: 'OR',
    selected: false,
  },
  {
    name: 'Palau',
    abbreviation: 'PW',
    selected: false,
  },
  {
    name: 'Pennsylvania',
    abbreviation: 'PA',
    selected: false,
  },
  {
    name: 'Puerto Rico',
    abbreviation: 'PR',
    selected: false,
  },
  {
    name: 'Rhode Island',
    abbreviation: 'RI',
    selected: false,
  },
  {
    name: 'South Carolina',
    abbreviation: 'SC',
    selected: false,
  },
  {
    name: 'South Dakota',
    abbreviation: 'SD',
    selected: false,
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN',
    selected: false,
  },
  {
    name: 'Texas',
    abbreviation: 'TX',
    selected: false,
  },
  {
    name: 'Utah',
    abbreviation: 'UT',
    selected: false,
  },
  {
    name: 'Vermont',
    abbreviation: 'VT',
    selected: false,
  },
  {
    name: 'Virgin Islands',
    abbreviation: 'VI',
    selected: false,
  },
  {
    name: 'Virginia',
    abbreviation: 'VA',
    selected: false,
  },
  {
    name: 'Washington',
    abbreviation: 'WA',
    selected: false,
  },
  {
    name: 'West Virginia',
    abbreviation: 'WV',
    selected: false,
  },
  {
    name: 'Wisconsin',
    abbreviation: 'WI',
    selected: false,
  },
  {
    name: 'Wyoming',
    abbreviation: 'WY',
    selected: false,
  },
];

export const branchOfServiceData = [
  'Army',
  'Navy',
  'Marine Corps',
  'Air Force',
  'Coast Guard',
  'Space Force',
  'NOAA',
  'USPHA',
];

export const menuData = [
  {
    id: 'request_cfile',
    title: 'Request C-file/DD 214',
    status: true,
    submenu: [
      {
        id: 'req_cfile_1',
        title: 'Request C-File/DD 214 (Form 20-10206)',
        path: '/forms/request-c-file',
        disabled: false,
        onPress: () => {},
      },
    ],
  },
  {
    id: 'misc_forms',
    title: 'Sworn Statements and Misc Forms',
    status: true,
    submenu: [
      {
        id: 'misc_1',
        title: 'PTSD Stressor Statement (Form 21-0781)',
        path: '/forms/ptsd-stressor',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'misc_2',
        title: 'Statement in Support of Claim (Form 21-4138)',
        path: '/forms/support-claim',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'misc_3',
        title: 'Medical Records Release (Form 21-4142)',
        path: '/forms/medical-records',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'misc_3',
        title: 'Increased Rating due to TDIU (Unemployability) (Form 21-8940)',
        path: '/forms/tdiu',
        disabled: false,
        onPress: () => {},
      },
    ],
  },
  {
    id: 'file_appeal',
    title: 'File An Appeal',
    status: true,
    submenu: [
      {
        id: 'appeal_1',
        title: 'Higher Level Review (Form 20-0996)',
        path: '/forms/higher-level-review',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'appeal_2',
        title: 'Board Appeal (Form 10182)',
        path: '/forms/board-appeal',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'appeal_3',
        title: 'Supplemental Claim Appeal',
        path: '/forms/supplemental-claim',
        disabled: false,
        onPress: () => {},
      },
    ],
  },
  {
    id: 'court_appeal',
    title: 'Court of Appeals for Veterans Claims-File Appeal',
    status: true,
    submenu: [
      {
        id: 'court_1',
        title: 'Notice of Appeal (NOA) & Optional Fee Waiver',
        path: '/forms/noa',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'court_2',
        title: 'Declaration of Financial Hardship (Fee Waiver)',
        path: '/forms/fee-waiver',
        disabled: false,
        onPress: () => {},
      },
    ],
  },
  {
    id: 'submit_claim',
    title: 'Submit a Claim',
    status: true,
    submenu: [
      {
        id: 'claim_1',
        title: 'New Claim or Increase (Form 21-526EZ)',
        path: '/forms/new-claim',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'claim_2',
        title: 'Supplemental Claim & Reopening (Form 20-0995)',
        path: '/forms/supplemnetal-claim-reopening',
        disabled: false,
        onPress: () => {},
      },
    ],
  },
];

export const disabilityData = [
  '7335: Anorectal abscess.',
  '8020: Brain abscess.',
  '7501: Kidney abscess.',
  '7350: Liver abscess.',
  '6824: Lung abscess.',
  '7828: Acne.',
  '7908: Acromegaly.',
  '6822: Actinomycosis.',
  "7911: Addison's disease.",
  '7702: Agranulocytosis, acquired.',
  '7717: AL amyloidosis.',
  '7831: Alopecia areata.',
  '7321: Amebiasis.',
  '5120: Complete amputation, upper extremity.',
  '5121: Amputation above insertion of deltoid.',
  '5122: Amputation below insertion of deltoid.',
  '5126: Amputation of five digits of one hand.',
  '5127: Amputation of thumb, index, long and ring.',
  '5128: Amputation of thumb, index, long and little.',
  '5129: Amputation of thumb, index, ring and little.',
  '5130: Amputation of thumb, long, ring and little.',
  '5131: Amputation of index, long, ring and little.',
  '5132: Amputation of thumb, index and long.',
  '5133: Amputation of thumb, index and ring.',
  '5134: Amputation of thumb, index and little.',
  '5135: Amputation of thumb, long and ring.',
  '5136: Amputation of thumb, long and little.',
  '5137: Amputation of thumb, ring and little.',
  '5138: Amputation of index, long and ring.',
  '5139: Amputation of index, long and little.',
  '5140: Amputation of index, ring and little.',
  '5141: Amputation of long, ring and little.',
  '5142: Amputation of thumb and index.',
  '5143: Amputation of thumb and long.',
  '5144: Amputation of thumb and ring.',
  '5145: Amputation of thumb and little.',
  '5146: Amputation of index and long.',
  '5147: Amputation of index and ring.',
  '5148: Amputation of index and little.',
  '5149: Amputation of long and ring.',
  '5150: Amputation of long and little.',
  '5151: Amputation of ring and little.',
  '5152: Amputation of thumb.',
  '5153: Amputation of index finger.',
  '5154: Amputation of long finger.',
  '5155: Amputation of ring finger.',
  '5156: Amputation of little finger.',
  '5123: Amputation of forearm above insertion of pronator teres.',
  '5124: Amputation of forearm below insertion of pronator teres.',
  '5163: Amputation of leg with defective stump.',
  '5164: Amputation of leg not improvable by prosthesis controlled by natural knee action.',
  '5165: Amputation of leg at lower level, permitting prosthesis.',
  '5166: Amputation of forefoot, proximal to metatarsal bones.',
  '5170: Amputation of all toes, without metatarsal loss or transmetatarsal, with up to half of metatarsal loss.',
  '5171: Amputation of great toe.',
  '5172: Amputation of toe, other than great, with removal of metatarsal head.',
  '5173: Amputation of three or more toes, without metatarsal involvement.',
  '5160: Complete amputation, lower extremity.',
  '5161: Amputation of thigh, upper third.',
  '5162: Amputation of thigh, middle or lower thirds.',
  '8017: Amyotrophic lateral sclerosis.',
  '6061: Anatomical loss of both eyes.',
  '6063: Anatomical loss of one eye, with visual acuity of other eye 5/200 (1.5/60).',
  '6064: Anatomical loss of one eye, with visual acuity of other eye 10/200 (3/60), 15/200 (4.5/60), or 20/200 (6/60).',
  '6065: Anatomical loss of one eye, with visual acuity of other eye 20/100 (6/30), 20/70 (6/21), or 20/50 (6/15).',
  '6066: Anatomical loss of one eye, with visual acuity of other eye 20/40 (6/12).',
  '5107: Anatomical loss of both feet.',
  '5106: Anatomical loss of both hands.',
  '5108: Anatomical loss of one hand and one foot.',
  '5105: Anatomical loss of one foot and loss of use of one hand.',
  '5104: Anatomical loss of one hand and loss of use of one foot.',
  '7723: Acquired hemolytic anemia.',
  '7721: Folic acid deficiency.',
  '7720: Iron deficiency anemia.',
  '7722: Pernicious anemia and Vitamin B12 deficiency anemia.',
  '7110: Aortic aneurysm, ascending, thoracic, abdominal.',
  '7111: Aneurysm, large artery.',
  '7118: Aneurysm, small artery.',
  '5270: Ankylosis of ankle.',
  '5224: Ankylosis of thumb.',
  '5225: Ankylosis of index finger.',
  '5226: Ankylosis of long finger.',
  '5227: Ankylosis of ring or little finger.',
  '5205: Ankylosis of elbow.',
  '5220: Ankylosis of five digits of one hand, favorable.',
  '5221: Ankylosis of four digits of one hand, favorable.',
  '5222: Ankylosis of three digits of one hand, favorable.',
  '5223: Ankylosis of two digits of one hand, favorable.',
  '5216: Ankylosis of five digits of one hand, unfavorable.',
  '5217: Ankylosis of four digits of one hand, unfavorable.',
  '5218: Ankylosis of three digits of one hand, unfavorable.',
  '5219: Ankylosis of two digits of one hand, unfavorable.',
  '5250: Ankylosis of hip.',
  '5256: Ankylosis of knee.',
  '5200: Ankylosis of scapulohumeral articulation.',
  '5272: Ankylosis of subastragalar or tarsal joint.',
  '5214: Ankylosis of wrist.',
  '5240: Ankylosing spondylitis.',
  '6029: Aphakia.',
  '6519: Aphonia, organic.',
  '7716: Aplastic anemia.',
  '7005: Arteriosclerotic heart disease.',
  '7113: Arteriovenous fistula.',
  '5003: Arthritis, degenerative, other than post-traumatic.',
  '5004: Arthritis, gonorrheal.',
  '5009: Arthritis, other specified forms (excluding gout).',
  '5005: Arthritis, pneumococcic.',
  '5010: Arthritis, post-traumatic.',
  '5002: Arthritis, multi-joint (except post-traumatic and gout).',
  '5008: Arthritis, streptococcic.',
  '5007: Arthritis, syphilitic.',
  '5006: Arthritis, typhoid.',
  '5009: Arthropathy.',
  '6833: Asbestosis.',
  '6838: Aspergillosis.',
  '6602: Asthma, bronchial.',
  '5274: Astragalectomy.',
  '7534: Atherosclerotic renal disease.',
  '8107: Athetosis.',
  '7015: Atrioventricular block.',
  '6313: Avitaminosis.',
  '6306: Bartonellosis.',
  '6314: Beriberi.',
  '7515: Bladder, calculus in.',
  '7545: Bladder, diverticulum of.',
  '7516: Bladder, fistula in.',
  '7517: Bladder, injury of.',
  '7542: Bladder, neurogenic.',
  '6836: Blastomycosis.',
  '6062: Blindness, both eyes, only light perception.',
  '6067: Blindness, one eye, only light perception, with visual acuity of other eye 5/200 (1.5/60).',
  '6068: Blindness, one eye, only light perception, with visual acuity of other eye 10/200 (3/60), 15/200 (4.5/60), or 20/200 (6/60).',
  '6069: Blindness, one eye, only light perception, with visual acuity of other eye 20/100 (6/30), 20/70 (6/21), or 20/50 (6/15).',
  '6070: Blindness, one eye, only light perception, with visual acuity of other eye 20/40 (6/12).',
  '5015: Bones, neoplasm, benign.',
  '5012: Bones, neoplasm, malignant, primary or secondary.',
  '5275: Bones, shortening of the lower extremity.',
  '7009: Bradycardia (Bradyarrhythmia), symptomatic, requiring permanent pacemaker implantation.',
  '8020: Brain abscess.',
  '7631: Breast, benign neoplasms.',
  '7626: Breast surgery.',
  '6601: Bronchiectasis.',
  '6600: Bronchitis.',
  '6316: Brucellosis.',
  "7115: Buerger's disease.",
  '8005: Bulbar palsy.',
  '7815: Bullous disorders.',
  '5019: Bursitis.',
  '6330: Campylobacter jejuni infection.',
  '7018: Cardiac pacemakers, implantable.',
  '7019: Cardiac transplantation.',
  '7020: Cardiomyopathy.',
  '7919: C-cell hyperplasia, thyroid.',
  '6028: Cataract, senile and others.',
  '6027: Cataract, traumatic.',
  '8046: Cerebral arteriosclerosis.',
  '5237: Cervical strain.',
  '7612: Cervix disease or injury.',
  "8106: Chorea, Huntington's.",
  "8105: Chorea, Sydenham's.",
  '7829: Chloracne.',
  '7314: Cholangitis, chronic.',
  '7318: Cholecystectomy (gallbladder removal), complications of (such as strictures and biliary leaks).',
  '7314: Cholecystitis, chronic.',
  '7315: Cholelithiasis, chronic.',
  '6005: Choroiditis.',
  '6354: Chronic Fatigue Syndrome (CFS).',
  '6824: Chronic lung abscess.',
  '6604: Chronic obstructive pulmonary disease.',
  '6835: Coccidioidomycosis.',
  '7122: Cold injury residuals.',
  '7323: Colitis, ulcerative.',
  '5331: Compartment syndrome.',
  '7621: Complete or incomplete pelvic organ prolapse due to injury or disease or surgical complications of pregnancy, including uterine or vaginal vault prolapse, cystocele, urethrocele, rectocele, enterocele, or combination.',
  '6017: Conjunctivitis, trachomatous.',
  '6018: Conjunctivitis, other.',
  '7017: Coronary bypass surgery.',
  '6331: Coxiella burnetii infection (Q Fever).',
  '6837: Cryptococcosis.',
  "7907: Cushing's syndrome.",
  '7821: Cutaneous manifestations of collagen-vascular diseases not listed elsewhere.',
  '6004: Cyclitis.',
  '7512: Cystitis, chronic.',
  '6031: Dacryocystitis.',
  '5011: Decompression illness.',
  '7806: Dermatitis or eczema.',
  '7813: Dermatophytosis.',
  '5324: Diaphragm, rupture.',
  '6840: Diaphragm, paralysis or paresis.',
  '6090: Diplopia.',
  '6092: Diplopia, limited muscle function, eye.',
  "7911: Addison's disease.",
  "7115: Buerger's disease.",
  '7355: Celiac disease.',
  "7326: Crohn's disease.",
  '7314: Gallbladder and biliary tract, chronic.',
  "7709: Hodgkin's disease.",
  "6302: Leprosy (Hansen's Disease).",
  '6319: Lyme disease.',
  "5279: Morton's disease.",
  '6320: Parasitic disease.',
  '7800: Disfigurement of head, face or neck.',
  '5258: Dislocated cartilage, semilunar.',
  '6033: Dislocated lens, crystalline.',
  '7540: Disseminated intravascular coagulation.',
  '7324: Distomiasis, intestinal or hepatic.',
  '7322: Dysentery, bacillary.',
  '6020: Ectropion.',
  '8007: Embolism, brain.',
  '6603: Emphysema, pulmonary.',
  '8000: Encephalitis, epidemic, chronic.',
  '7001: Endocarditis.',
  '7629: Endometriosis.',
  '7325: Enteritis, chronic.',
  '7326: Enterocolitis, chronic.',
  '6021: Entropion.',
  '6828: Eosinophilic granuloma of lung.',
  '8913: Epilepsy, diencephalic.',
  '8910: Epilepsy, grand mal.',
  '8912: Epilepsy, Jacksonian and focal motor or sensory.',
  '8911: Epilepsy, petit mal.',
  '8914: Epilepsy, psychomotor.',
  '6025: Epiphora.',
  '7827: Erythema multiforme.',
  '7817: Erythroderma.',
  '7119: Erythromelalgia.',
  "7207: Barrett's esophagus.",
  '7205: Esophagus, diverticulum.',
  '7204: Esophagus, motility disorder.',
  '7203: Esophagus, stricture.',
  '7614: Fallopian tube.',
  '7632: Female sexual arousal disorder (FSAD).',
  '6308: Relapsing fever.',
  '6309: Rheumatic fever.',
  '6825: Fibrosis of lung, diffuse interstitial.',
  '5025: Fibromyalgia.',
  '7335: Fistula in ano.',
  '7624: Fistula, rectovaginal.',
  '7625: Fistula, urethrovaginal.',
  '5276: Flatfoot, acquired.',
  '7307: Gastritis, chronic.',
  '7206: Gastroesophageal reflux disease.',
  '5263: Genu recurvatum.',
  '6012: Glaucoma, congestive or inflammatory.',
  '6013: Glaucoma, simple, primary, noncongestive.',
  '7536: Glomerulonephritis.',
  '5017: Gout.',
  "7900: Graves' disease.",
  '5281: Hallux rigidus.',
  '5280: Hallux valgus.',
  '5282: Hammer toe.',
  '7016: Heart valve replacement.',
  '7718: Essential thrombocythemia and primary myelofibrosis.',
  '7705: Immune thrombocytopenia.',
  '7712: Multiple myeloma.',
  '7725: Myelodysplastic syndromes.',
  '7724: Solitary plasmacytoma.',
  '8012: Hematomyelia.',
  '6007: Hemorrhage, intra-ocular.',
  '6329: Hemorrhagic fevers, including dengue, yellow fever, and others.',
  '7336: Hemorrhoids.',
  '7354: Hepatitis C.',
  '7338: Hernia, femoral, inguinal, umbilical, ventral, incisional, and other.',
  '7346: Hernia, hiatal and paraesophageal.',
  '5326: Hernia, muscle.',
  '5023: Heterotopic ossification.',
  '5254: Hip, flail joint.',
  '6351: HIV-Related Illness.',
  "7709: Hodgkin's lymphoma.",
  '7509: Hydronephrosis.',
  '7917: Hyperaldosteronism.',
  '7832: Hyperhidrosis.',
  '7904: Hyperparathyroidism.',
  '7916: Hyperpituitarism.',
  '7007: Hypertensive heart disease.',
  '7101: Hypertensive vascular disease.',
  '7008: Hyperthyroid heart disease.',
  '7900: Hyperthyroidism.',
  '7905: Hypoparathyroidism.',
  '7903: Hypothyroidism.',
  '5202: Impairment of humerus.',
  '5203: Impairment of clavicle or scapula.',
  '5209: Impairment of elbow.',
  '5253: Impairment of thigh.',
  '5255: Impairment of femur.',
  '5257: Impairment of knee, other.',
  '6080: Impairment of field vision.',
  '5262: Impairment of tibia and fibula.',
  '7332: Impairment of rectum and anus.',
  '5211: Impairment of ulna.',
  '7018: Implantable cardiac pacemakers.',
  '7820: Infections of the skin.',
  '7517: Injury of bladder.',
  '7631: Injury of breast.',
  '6009: Injury of eye, unhealed.',
  '5284: Injury of foot.',
  '7317: Injury of gallbladder.',
  '7201: Injury of lips.',
  '7311: Injury of liver, residuals.',
  '7200: Injury of mouth, soft tissue.',
  '5301: Muscle injury, Group I Function: Upward rotation of scapula.',
  '5302: Muscle injury, Group II Function: Depression of arm.',
  '5303: Muscle injury, Group III Function: Elevation and abduction of arm.',
  '5304: Muscle injury, Group IV Function: Stabilization of shoulder.',
  '5305: Muscle injury, Group V Function: Elbow supination.',
  '5306: Muscle injury, Group VI Function: Extension of elbow.',
  '5307: Muscle injury, Group VII Function: Flexion of wrist and fingers.',
  '5308: Muscle injury, Group VIII Function: Extension of wrist, fingers, thumb.',
  '5309: Muscle injury, Group IX Function: Forearm muscles.',
  '5310: Muscle injury, Group X Function: Movement of forefoot and toes.',
  '5311: Muscle injury, Group XI Function: Propulsion of foot.',
  '5312: Muscle injury, Group XII Function: Dorsiflexion.',
  '5313: Muscle injury, Group XIII Function: Extension of hip and flexion of knee.',
  '5314: Muscle injury, Group XIV Function: Extension of knee.',
  '5315: Muscle injury, Group XV Function: Adduction of hip.',
  '5316: Muscle injury, Group XVI Function: Flexion of hip.',
  '5317: Muscle injury, Group XVII Function: Extension of hip.',
  '5318: Muscle injury, Group XVIII Function: Outward rotation of thigh.',
  '5319: Muscle injury, Group XIX Function: Abdominal wall and lower thorax.',
  '5320: Muscle injury, Group XX Function: Postural support of body.',
  '5321: Muscle injury, Group XXI Function: Respiration.',
  '5322: Muscle injury, Group XXII Function: Rotary and forward movements, head.',
  '5323: Muscle injury, Group XXIII Function: Movements of head.',
  '6521: Injury of pharynx.',
  '5236: Injury of sacroiliac.',
  '6841: Injury of spinal cord.',
  '7310: Injury of stomach, residuals.',
  '6003: Iritis.',
  '7537: Interstitial nephritis, including gouty nephropathy, disorders of calcium metabolism.',
  '5243: Intervertebral disc syndrome.',
  '7330: Intestine, fistulous disease, external.',
  '7329: Intestine, large, resection of.',
  '7328: Intestine, small, resection of.',
  '7319: Irritable bowel syndrome (IBS).',
  '7824: Keratinization, diseases of.',
  '6001: Keratitis.',
  '6035: Keratoconus.',
  '7501: Kidney abscess.',
  '7533: Kidney, cystic diseases.',
  '7500: Kidney, removal.',
  '7531: Kidney transplant.',
  '7505: Kidney, tuberculosis.',
  '6842: Kyphoscoliosis, pectus excavatum/carinatum.',
  '6022: Lagophthalmos.',
  '6518: Laryngectomy.',
  '6515: Laryngitis, tuberculous.',
  '6516: Laryngitis, chronic.',
  '6520: Larynx, stenosis of.',
  '7807: Leishmaniasis, American (New World).',
  '7808: Leishmaniasis, Old World.',
  "6302: Leprosy (Hansen's Disease).",
  '7703: Leukemia.',
  '7719: Chronic myelogenous leukemia (CML).',
  '5207: Limitation of extension, forearm.',
  '5261: Limitation of extension, leg.',
  '5212: Limitation of extension, radius.',
  '5213: Limitation of supination and pronation.',
  '5251: Limitation of extension, thigh.',
  '5208: Limitation of extension and flexion, forearm.',
  '5206: Limitation of flexion, forearm.',
  '5260: Limitation of flexion, leg.',
  '5252: Limitation of flexion, thigh.',
  '5271: Limitation of motion, ankle.',
  '5201: Limitation of motion, arm.',
  '5229: Limitation of motion, index or long finger.',
  '5230: Limitation of motion, ring or little finger.',
  '9905: Limitation of motion, temporomandibular.',
  '5228: Limitation of motion, thumb.',
  '5215: Limitation of motion, wrist.',
  '7345: Liver disease, chronic, without cirrhosis.',
  '7351: Liver transplant.',
  '7312: Liver, cirrhosis.',
  '6207: Loss of auricle.',
  '9908: Loss of condyloid process.',
  '9909: Loss of coronoid process.',
  '6023: Loss of eyebrows.',
  '6024: Loss of eyelashes.',
  '6032: Loss of eyelids.',
  '9911: Loss of palate, hard.',
  '9902: Loss of mandible, including ramus, unilaterally or bilaterally.',
  '9914: Loss of maxilla, more than half.',
  '9915: Loss of maxilla, less than half.',
  '6504: Loss of nose, part of, or scars.',
  '5296: Loss of skull, part of.',
  '6275: Loss of smell, sense of.',
  '6276: Loss of taste, sense of.',
  '9913: Loss of teeth.',
  '7202: Loss of tongue, whole or part.',
  '5110: Loss of use of both feet.',
  '5109: Loss of use of both hands.',
  '5167: Loss of use of foot.',
  '5125: Loss of use of hand.',
  '5111: Loss of use of one hand and one foot.',
  '5237: Lumbosacral strain.',
  '6350: Lupus erythematosus.',
  '7809: Lupus erythematosus, discoid.',
  '6319: Lyme disease.',
  '6304: Malaria.',
  '7833: Malignant melanoma.',
  '9904: Malunion of mandible.',
  '5273: Malunion of os calcis or astragalus.',
  '9916: Malunion or nonunion of maxilla.',
  '9900: Maxilla or mandible, chronic osteomyelitis, osteonecrosis, or osteoradionecrosis of.',
  '6318: Melioidosis.',
  "6205: Meniere's syndrome.",
  '8019: Meningitis, cerebrospinal, epidemic.',
  '9520: Anorexia nervosa.',
  '9432: Bipolar disorder.',
  '9521: Bulimia nervosa.',
  '9440: Chronic adjustment disorder.',
  '9424: Conversion disorder (functional neurological symptom disorder).',
  '9431: Cyclothymic disorder.',
  '9300: Delirium.',
  '9208: Delusional disorder.',
  '9417: Depersonalization/derealization disorder.',
  '9416: Dissociative amnesia; dissociative identity disorder.',
  '9400: Generalized anxiety disorder.',
  '9425: Illness anxiety disorder.',
  '9434: Major depressive disorder.',
  "9312: Major or mild neurocognitive disorder due to Alzheimer's disease.",
  '9326: Major or mild neurocognitive disorder due to another medical condition or substance/medication-induced.',
  '9301: Major or mild neurocognitive disorder due to HIV or other infections.',
  '9304: Major or mild neurocognitive disorder due to traumatic brain injury.',
  '9305: Major or mild vascular neurocognitive disorder.',
  '9404: Obsessive compulsive disorder.',
  '9210: Other specified and unspecified schizophrenia spectrum and other psychotic disorders.',
  '9410: Other specified anxiety disorder.',
  '9422: Other specified somatic symptom and related disorder.',
  '9412: Panic disorder and/or agoraphobia.',
  '9433: Persistent depressive disorder (dysthymia).',
  '9411: Posttraumatic stress disorder.',
  '9211: Schizoaffective disorder.',
  '9201: Schizophrenia.',
  '9421: Somatic symptom disorder.',
  '9403: Specific phobia; social anxiety disorder (social phobia).',
  '9423: Unspecified somatic symptom and related disorder.',
  '9413: Unspecified anxiety disorder.',
  '9435: Unspecified depressive disorder.',
  '9310: Unspecified neurocognitive disorder.',
  '5279: Metatarsalgia.',
  '8100: Migraine.',
  '6839: Mucormycosis.',
  '8018: Multiple sclerosis.',
  '8010: Myelitis.',
  '7006: Myocardial infarction.',
  '5021: Myositis.',
  '8108: Narcolepsy.',
  '7631: Neoplasms, benign, breast.',
  '7344: Neoplasms, benign, digestive system.',
  '6209: Neoplasms, benign, ear.',
  '7915: Neoplasms, benign, endocrine.',
  '7529: Neoplasms, benign, genitourinary.',
  '7628: Neoplasms, benign, gynecological.',
  '9917: Neoplasms, benign, hard and soft tissue.',
  '5328: Neoplasms, benign, muscle.',
  '6820: Neoplasms, benign, respiratory.',
  '7819: Neoplasms, benign, skin.',
  '7630: Neoplasms, malignant, breast.',
  '7343: Neoplasms, malignant, digestive system.',
  '6208: Neoplasms, malignant, ear.',
  '7914: Neoplasms, malignant, endocrine.',
  '7528: Neoplasms, malignant, genitourinary.',
  '7627: Neoplasms, malignant, gynecological.',
  '9918: Neoplasms, malignant, hard and soft tissue.',
  '5327: Neoplasms, malignant, muscle.',
  '6819: Neoplasms, malignant, respiratory.',
  '7818: Neoplasms, malignant, skin.',
  '7502: Nephritis, chronic.',
  '7508: Nephrolithiasis/Ureterolithiasis/Nephrocalcinosis.',
  '7507: Nephrosclerosis, arteriolar.',
  '8405: Neuralgia, fifth (trigeminal) cranial nerve.',
  '8407: Neuralgia, seventh (facial) cranial nerve.',
  '8409: Neuralgia, ninth (glossopharyngeal) cranial nerve.',
  '8410: Neuralgia, tenth (pneumogastric, vagus) cranial nerve.',
  '8411: Neuralgia, eleventh (spinal accessory, external branch) cranial nerve.',
  '8412: Neuralgia, twelfth (hypoglossal) cranial nerve.',
  '8710: Neuralgia, upper radicular group, peripheral nerve.',
  '8711: Neuralgia, middle radicular group, peripheral nerve.',
  '8712: Neuralgia, lower radicular group, peripheral nerve.',
  '8713: Neuralgia, all radicular groups, peripheral nerve.',
  '8714: Neuralgia, musculospiral (radial), peripheral nerve.',
  '8715: Neuralgia, median, peripheral nerve.',
  '8716: Neuralgia, ulnar, peripheral nerve.',
  '8717: Neuralgia, musculocutaneous, peripheral nerve.',
  '8718: Neuralgia, circumflex, peripheral nerve.',
  '8719: Neuralgia, long thoracic, peripheral nerve.',
  '8720: Neuralgia, sciatic, peripheral nerve.',
  '8721: Neuralgia, external popliteal (common peroneal), peripheral nerve.',
  '8722: Neuralgia, musculocutaneous (superficial peroneal), peripheral nerve.',
  '8723: Neuralgia, anterior tibial (deep peroneal), peripheral nerve.',
  '8724: Neuralgia, internal popliteal (tibial), peripheral nerve.',
  '8725: Neuralgia, posterior tibial, peripheral nerve.',
  '8726: Neuralgia, anterior crural (femoral), peripheral nerve.',
  '8727: Neuralgia, internal saphenous, peripheral nerve.',
  '8728: Neuralgia, obturator, peripheral nerve.',
  '8729: Neuralgia, external cutaneous nerve of thigh, peripheral nerve.',
  '8730: Neuralgia, ilio-inguinal, peripheral nerve.',
  '6026: Neuritis, optic.',
  '8610: Neuritis, upper radicular group, peripheral nerve.',
  '8611: Neuritis, middle radicular group, peripheral nerve.',
  '8612: Neuritis, lower radicular group, peripheral nerve.',
  '8613: Neuritis, all radicular groups, peripheral nerve.',
  '8614: Neuritis, musculospiral (radial), peripheral nerve.',
  '8615: Neuritis, median, peripheral nerve.',
  '8616: Neuritis, ulnar, peripheral nerve.',
  '8617: Neuritis, musculocutaneous, peripheral nerve.',
  '8618: Neuritis, circumflex, peripheral nerve.',
  '8619: Neuritis, long thoracic, peripheral nerve.',
  '8620: Neuritis, sciatic, peripheral nerve.',
  '8621: Neuritis, external popliteal (common peroneal), peripheral nerve.',
  '8622: Neuritis, musculocutaneous (superficial peroneal), peripheral nerve.',
  '8623: Neuritis, anterior tibial (deep peroneal), peripheral nerve.',
  '8624: Neuritis, internal popliteal (tibial), peripheral nerve.',
  '8625: Neuritis, posterior tibial, peripheral nerve.',
  '8626: Neuritis, anterior crural (femoral), peripheral nerve.',
  '8627: Neuritis, internal saphenous, peripheral nerve.',
  '8628: Neuritis, obturator, peripheral nerve.',
  '8629: Neuritis, external cutaneous nerve of thigh, peripheral nerve.',
  '8630: Neuritis, ilio-inguinal, peripheral nerve.',
  '7542: Neurogenic bladder.',
  '5015: New growths, benign, bones.',
  '8003: New growths, benign, brain.',
  '6015: New growths, benign, eye, orbit, and adnexa.',
  '8022: New growths, benign, spinal cord.',
  '5012: New growths, malignant, bones.',
  '8002: New growths, malignant, brain.',
  '6014: New growths, malignant, eye, orbit, and adnexa.',
  '8021: New growths, malignant, spinal cord.',
  '6823: Nocardiosis.',
  "7715: Non-Hodgkin's lymphoma.",
  '6312: Nontuberculosis mycobacterium infection.',
  '6333: Nontyphoid salmonella infection.',
  '9903: Nonunion of mandible, confirmed by diagnostic imaging studies.',
  '5210: Nonunion of radius and ulna.',
  '6016: Nystagmus, central.',
  '5016: Osteitis deformans.',
  '5014: Osteomalacia, residuals of.',
  '5000: Osteomyelitis.',
  '5013: Osteoporosis, residuals of.',
  '6210: Otitis media, externa.',
  '6201: Otitis media, nonsuppurative.',
  '6200: Otitis media, suppurative.',
  '6202: Otosclerosis.',
  '7620: Ovaries, atrophy of both.',
  '7615: Ovary, disease or injury.',
  '7619: Ovary, removal.',
  '8005: Palsy, bulbar.',
  '7347: Pancreas, chronic pancreatitis.',
  '7357: Pancreas, post pancreatectomy syndrome.',
  '7303: Pancreas, surgery, complications of.',
  '7352: Pancreas, transplant.',
  '7538: Papillary necrosis.',
  '7822: Papulosquamous disorders.',
  '6030: Paralysis, accommodation.',
  '8004: Paralysis agitans.',
  '5244: Paralysis, complete, traumatic.',
  '8205: Paralysis, fifth (trigeminal) cranial nerve.',
  '8207: Paralysis, seventh (facial) cranial nerve.',
  '8209: Paralysis, ninth (glossopharyngeal) cranial nerve.',
  '8210: Paralysis, tenth (pneumogastric, vagus) cranial nerve.',
  '8211: Paralysis, eleventh (spinal accessory, external branch) cranial nerve.',
  '8212: Paralysis, twelfth (hypoglossal) cranial nerve.',
  '8510: Paralysis, upper radicular group, peripheral nerve.',
  '8511: Paralysis, middle radicular group, peripheral nerve.',
  '8512: Paralysis, lower radicular group, peripheral nerve.',
  '8513: Paralysis, all radicular groups, peripheral nerve.',
  '8514: Paralysis, musculospiral (radial), peripheral nerve.',
  '8515: Paralysis, median, peripheral nerve.',
  '8516: Paralysis, ulnar, peripheral nerve.',
  '8517: Paralysis, musculocutaneous, peripheral nerve.',
  '8518: Paralysis, circumflex, peripheral nerve.',
  '8519: Paralysis, long thoracic, peripheral nerve.',
  '8520: Paralysis, sciatic, peripheral nerve.',
  '8521: Paralysis, external popliteal (common peroneal), peripheral nerve.',
  '8522: Paralysis, musculocutaneous (superficial peroneal), peripheral nerve.',
  '8523: Paralysis, anterior tibial nerve (deep peroneal), peripheral nerve.',
  '8524: Paralysis, internal popliteal (tibial), peripheral nerve.',
  '8525: Paralysis, posterior tibial nerve, peripheral nerve.',
  '8526: Paralysis, anterior crural nerve (femoral), peripheral nerve.',
  '8527: Paralysis, internal saphenous, peripheral nerve.',
  '8528: Paralysis, obturator, peripheral nerve.',
  '8529: Paralysis, external cutaneous nerve of thigh, peripheral nerve.',
  '8530: Paralysis, ilio-inguinal, peripheral nerve.',
  '8104: Paramyoclonus multiplex.',
  '6320: Parasitic disease.',
  '6315: Pellagra.',
  '7522: Penis, erectile dysfunction.',
  '7521: Penis, removal of glans.',
  '7520: Penis, removal of half or more.',
  '7003: Pericardial adhesions.',
  '7002: Pericarditis.',
  '7114: Peripheral arterial disease.',
  '6204: Peripheral vestibular disorders.',
  '7301: Peritoneum, adhesions.',
  '7331: Peritonitis.',
  '5278: Pes cavus (Claw foot), acquired.',
  '7918: Pheochromocytoma.',
  '6307: Plague.',
  '5269: Plantar fasciitis.',
  '6845: Pleural effusion or fibrosis.',
  '7912: Pluriglandular syndrome.',
  '6832: Pneumoconiosis.',
  '6829: Pneumonitis & fibrosis, drug-induced.',
  '6830: Pneumonitis & fibrosis, radiation-induced.',
  '8011: Poliomyelitis, anterior.',
  '7704: Polycythemia vera.',
  '7912: Polyglandular syndrome.',
  '6046: Post-chiasmal disorders.',
  '7308: Postgastrectomy syndromes.',
  '7121: Post-phlebitic syndrome.',
  '6844: Post-surgical residual.',
  '8023: Progressive muscular atrophy.',
  '7527: Prostate gland injuries, infections, hypertrophy, postoperative residuals, bladder outlet obstruction.',
  '7525: Prostatitis, urethritis, epididymitis, orchitis (unilateral or bilateral), chronic only.',
  '5056: Prosthetic implants, ankle replacement.',
  '5052: Prosthetic implants, elbow replacement.',
  '5054: Prosthetic implants, hip, resurfacing or replacement.',
  '5055: Prosthetic implants, knee, resurfacing or replacement.',
  '5051: Prosthetic implants, shoulder replacement.',
  '5053: Prosthetic implants, wrist replacement.',
  '7816: Psoriasis.',
  '6034: Pterygium.',
  '6019: Ptosis.',
  '6817: Pulmonary vascular disease.',
  '7337: Pruritus ani (anal itching).',
  '7504: Pyelonephritis, chronic.',
  "7124: Raynaud's disease (primary Raynaud's).",
  "7117: Raynaud's syndrome (secondary Raynaud's phenomenon, secondary Raynaud's).",
  '7333: Rectum & anus, stricture.',
  '7334: Rectum, prolapse.',
  '5259: Removal of cartilage, semilunar.',
  '5298: Removal of coccyx.',
  '7318: Removal of gall bladder.',
  '7500: Removal of kidney.',
  '7521: Removal of penis glans.',
  '7520: Removal of penis half or more.',
  '5297: Removal of ribs.',
  '7524: Removal of testis.',
  '7619: Removal of ovary.',
  '7618: Removal of uterus.',
  '7617: Removal of uterus and both ovaries.',
  '7539: Renal amyloid disease.',
  '7544: Renal disease caused by viral infection such as HIV, Hepatitis B, and Hepatitis C.',
  '7530: Renal disease, chronic.',
  '7541: Renal involvement in diabetes mellitus type I or II.',
  '7532: Renal tubular disorders.',
  '7328: Resection of intestine, small.',
  '7329: Resection of intestine, large.',
  '6008: Retina, detachment of.',
  '6042: Retinal dystrophy (including retinitis pigmentosa, wet or dry macular degeneration, early-onset macular degeneration, rod and/or cone dystrophy).',
  '6040: Retinopathy, diabetic.',
  '6006: Retinopathy or maculopathy not otherwise specified.',
  '5330: Rhabdomyolysis, residuals of.',
  '6522: Rhinitis, allergic or vasomotor.',
  '6523: Rhinitis, bacterial.',
  '6524: Rhinitis, granulomatous.',
  '6317: Rickettsial, ehrlichia, and anaplasma infections.',
  '6846: Sarcoidosis.',
  '7830: Scarring alopecia.',
  '7800: Scars, burn scar(s) of the head, face, or neck; scar(s) of the head, face, or neck due to other causes; or other disfigurement of the head, face, or neck.',
  '7801: Scars, burn scar(s) or scar(s) due to other causes, not of the head, face, or neck that are associated with underlying soft tissue damage.',
  '7802: Scars, burn scar(s) or scar(s) due to other causes, not of the head, face, or neck that are not associated with underlying soft tissue damage.',
  '6011: Scars, retina.',
  '7805: Scars, other; and other effects of scars evaluated under diagnostic codes 7800, 7801, 7802, or 7804.',
  '7804: Scars, unstable or painful.',
  '6326: Schistosomiasis.',
  '6334: Shigella infections.',
  '6511: Sinusitis, ethmoid.',
  '6512: Sinusitis, frontal.',
  '6513: Sinusitis, maxillary.',
  '6510: Sinusitis, pansinusitis.',
  '6514: Sinusitis, sphenoid.',
  '6847: Sleep Apnea Syndrome.',
  '5329: Soft tissue sarcoma, muscle, fat, or fibrous connected.',
  '8540: Soft tissue sarcoma, neurogenic origin.',
  '7123: Soft tissue sarcoma, vascular origin.',
  '5242: Spine, degenerative arthritis, degenerative disc disease other than intervertebral disc syndrome.',
  '5241: Spinal fusion.',
  '5238: Spinal stenosis.',
  '7707: Spleen, injury of, healed.',
  '7706: Splenectomy.',
  '5239: Spondylolisthesis or segmental instability, spine.',
  '7308: Stomach, postgastrectomy syndrome.',
  '7309: Stomach, stenosis of.',
  '7303: Stomach, surgery, complications of.',
  '7010: Supraventricular tachycardia.',
  '6091: Symblepharon.',
  '6354: Chronic Fatigue Syndrome (CFS).',
  "7907: Cushing's syndrome.",
  '7356: Gastrointestinal dysmotility syndrome.',
  "6205: Meniere's syndrome.",
  '7308: Postgastrectomy syndromes.',
  '7357: Post pancreatectomy syndrome.',
  "7117: Raynaud's syndrome.",
  '6847: Sleep Apnea Syndrome.',
  '6310: Syphilis.',
  '8013: Syphilis, cerebrospinal.',
  '8014: Syphilis, meningovascular.',
  '7004: Syphilitic heart disease.',
  '8024: Syringomyelia.',
  '8015: Tabes dorsalis.',
  '5283: Tarsal or metatarsal bones.',
  '5024: Tenosynovitis, tendinitis, tendinosis or tendinopathy.',
  '7523: Testis, atrophy, complete.',
  '7524: Testis, removal.',
  '7705: Thrombocytopenia.',
  '8008: Thrombosis, brain.',
  '7902: Thyroid gland, nontoxic thyroid enlargement.',
  '7901: Thyroid gland, toxic thyroid enlargement.',
  '7906: Thyroiditis.',
  '8103: Tic, convulsive.',
  '6260: Tinnitus, recurrent.',
  '7535: Toxic nephropathy.',
  '8045: Traumatic brain injury residuals.',
  '6843: Traumatic chest wall defect.',
  '7710: Tuberculosis, adenitis.',
  '5001: Tuberculosis, bones and joints.',
  '6010: Tuberculosis, eye.',
  '7505: Tuberculosis, kidney.',
  '7811: Tuberculosis, luposa (lupus vulgaris).',
  '6311: Tuberculosis, miliary.',
  '6732: Tuberculosis, pleurisy, active or inactive.',
  '6701: Tuberculosis, pulmonary, active, far advanced.',
  '6702: Tuberculosis, pulmonary, active, moderately advanced.',
  '6703: Tuberculosis, pulmonary, active, minimal.',
  '6704: Tuberculosis, pulmonary, active, advancement unspecified.',
  '6730: Tuberculosis, pulmonary, active, chronic.',
  '6731: Tuberculosis, pulmonary, inactive, chronic.',
  '6721: Tuberculosis, pulmonary, inactive, far advanced.',
  '6722: Tuberculosis, pulmonary, inactive, moderately advanced.',
  '6723: Tuberculosis, pulmonary, inactive, minimal.',
  '6724: Tuberculosis, pulmonary, inactive, advancement unspecified.',
  '6211: Tympanic membrane.',
  '7304: Ulcer, peptic.',
  '7511: Ureter, stricture of.',
  '7519: Urethra, fistula.',
  '7518: Urethra, stricture.',
  '7825: Urticaria, chronic.',
  '7611: Vagina, disease or injury.',
  '7348: Vagotomy.',
  '7000: Valvular heart disease.',
  '7543: Varicocele/Hydrocele.',
  '7120: Varicose veins.',
  '7826: Vasculitis, primary cutaneous.',
  '7011: Ventricular arrhythmia.',
  '5235: Vertebral fracture or dislocation.',
  '6300: Vibriosis (Cholera, Non-cholera).',
  '6301: Visceral Leishmaniasis.',
  '7342: Visceroptosis.',
  '6071: Vision, one eye 5/200 (1.5/60), with visual acuity of other eye 5/200 (1.5/60).',
  '6072: Vision, one eye 5/200 (1.5/60), with visual acuity of other eye 10/200 (3/60), 15/200 (4.5/60), or 20/200 (6/60).',
  '6073: Vision, one eye 5/200 (1.5/60), with visual acuity of other eye 20/100 (6/30), 20/70 (6/21), or 20/50 (6/15).',
  '6074: Vision, one eye 5/200 (1.5/60), with visual acuity of other eye 20/40 (6/12).',
  '6075: Vision, one eye 10/200 (3/60), 15/200 (4.5/60), or 20/200 (6/60), with visual acuity of other eye 10/200 (3/60), 15/200 (4.5/60), or 20/200 (6/60).',
  '6076: Vision, one eye 10/200 (3/60), 15/200 (4.5/60), or 20/200 (6/60), with visual acuity of other eye 20/100 (6/30), 20/70 (6/21), or 20/50 (6/15).',
  '6077: Vision, one eye 10/200 (3/60), 15/200 (4.5/60), or 20/200 (6/60), with visual acuity of other eye 20/40 (6/12).',
  '6078: Vision, one eye 20/100 (6/30), 20/70 (6/21), or 20/50 (6/15), with visual acuity of other eye 20/100 (6/30), 20/70 (6/21), or 20/50 (6/15).',
  '6079: Vision, one eye 20/100 (6/30), 20/70 (6/21), or 20/50 (6/15), with visual acuity of other eye 20/40 (6/12); or each eye 20/40 (6/12).',
  '7823: Vitiligo.',
  '7610: Vulva or clitoris, disease or injury of.',
  '5277: Weak foot.',
  '6335: West Nile virus infection.',
];

export const formsIdList = [
  {
    formId: 'fillform',
    formTitle: 'Submit Intent to File',
    formUrl: '/forms/submit-to-intent',
  },

  {
    formId: 'requestcfile',
    formTitle: 'Request C-File/DD 214 (Form 20-10206)',
    formUrl: '/forms/request-c-file',
  },

  {
    formId: 'ptsdform',
    formTitle: 'PTSD Stressor Statement (Form 21-0781)',
    formUrl: '/forms/ptsd-stressor',
  },
  {
    formId: 'supportofclaim',
    formTitle: 'Statement in Support of Claim (Form 21-4138)',
    formUrl: '/forms/support-claim',
  },
  {
    formId: 'medicalrecords',
    formTitle: 'Medical Records Release (Form 21-4142)',
    formUrl: '/forms/medical-records',
  },
  {
    formId: 'tdiuform',
    formTitle: 'Increased Rating due to TDIU (Unemployability) (Form 21-8940)',
    formUrl: '/forms/tdiu',
  },

  {
    formId: 'higherlevelreview',
    formTitle: 'Higher Level Review (Form 20-0996)',
    formUrl: '/forms/higher-level-review',
  },
  {
    formId: 'boardappeal',
    formTitle: 'Board Appeal (Form 10182)',
    formUrl: '/forms/board-appeal',
  },
  {
    formId: 'supplementalclaimAppeal',
    formTitle: 'Supplemental Claim Appeal',
    formUrl: '/forms/supplemental-claim',
  },

  {
    formId: 'courtform',
    formTitle: 'Notice of Appeal (NOA) & Optional Fee Waiver',
    formUrl: '/forms/noa',
  },
  {
    formId: 'financial_hardship',
    formTitle: 'Declaration of Financial Hardship (Fee Waiver)',
    formUrl: '/forms/fee-waiver',
  },

  {
    formId: 'newclaim',
    formTitle: 'New Claim or Increase (Form 21-526EZ)',
    formUrl: '/forms/new-claim',
  },
  {
    formId: 'supplementalclaim',
    formTitle: 'Supplemental Claim & Reopening (Form 20-0995)',
    formUrl: '/forms/supplemnetal-claim-reopening',
  },
];

export const monthMapDecCycle = {
  December: 1,
  January: 2,
  February: 3,
  March: 4,
  April: 5,
  May: 6,
  June: 7,
  July: 8,
  August: 9,
  September: 10,
  October: 11,
  November: 12,
};

export const CompensationRateData = [
  {
    "cola_year": "2025",
    "effective_date": "2024-12-01",
    "rates": {
      "10%": {
        "flat": 175.51
      },
      "20%": {
        "flat": 346.95
      },
      "30%": {
        "base": {
          "veteran_alone": 537.42,
          "veteran_spouse": 601.42,
          "veteran_spouse_one_parent": 652.42,
          "veteran_spouse_two_parents": 703.42,
          "veteran_one_parent": 588.42,
          "veteran_two_parents": 639.42,
          "veteran_one_child": 579.42,
          "veteran_spouse_one_child": 648.42,
          "veteran_spouse_one_parent_one_child": 699.42,
          "veteran_spouse_two_parents_one_child": 750.42,
          "veteran_one_parent_one_child": 630.42,
          "veteran_two_parents_one_child": 681.42
        },
        "addons": {
          "additional_child_under_18": 31.00,
          "additional_child_over_18_school": 102.00,
          "spouse_aid_and_attendance": 58.00
        }
      },
      "40%": {
        "base": {
          "veteran_alone": 774.16,
          "veteran_spouse": 859.16,
          "veteran_spouse_one_parent": 927.16,
          "veteran_spouse_two_parents": 995.16,
          "veteran_one_parent": 842.16,
          "veteran_two_parents": 910.16,
          "veteran_one_child": 831.16,
          "veteran_spouse_one_child": 922.16,
          "veteran_spouse_one_parent_one_child": 990.16,
          "veteran_spouse_two_parents_one_child": 1058.16,
          "veteran_one_parent_one_child": 899.16,
          "veteran_two_parents_one_child": 967.16
        },
        "addons": {
          "additional_child_under_18": 42.00,
          "additional_child_over_18_school": 137.00,
          "spouse_aid_and_attendance": 78.00
        }
      },
      "50%": {
        "base": {
          "veteran_alone": 1102.04,
          "veteran_spouse": 1208.04,
          "veteran_spouse_one_parent": 1293.04,
          "veteran_spouse_two_parents": 1378.04,
          "veteran_one_parent": 1187.04,
          "veteran_two_parents": 1272.04,
          "veteran_one_child": 1173.04,
          "veteran_spouse_one_child": 1287.04,
          "veteran_spouse_one_parent_one_child": 1372.04,
          "veteran_spouse_two_parents_one_child": 1457.04,
          "veteran_one_parent_one_child": 1258.04,
          "veteran_two_parents_one_child": 1343.04
        },
        "addons": {
          "additional_child_under_18": 53.00,
          "additional_child_over_18_school": 171.00,
          "spouse_aid_and_attendance": 98.00
        }
      },
      "60%": {
        "base": {
          "veteran_alone": 1395.93,
          "veteran_spouse": 1523.93,
          "veteran_spouse_one_parent": 1625.93,
          "veteran_spouse_two_parents": 1727.93,
          "veteran_one_parent": 1497.93,
          "veteran_two_parents": 1599.93,
          "veteran_one_child": 1480.93,
          "veteran_spouse_one_child": 1617.93,
          "veteran_spouse_one_parent_one_child": 1719.93,
          "veteran_spouse_two_parents_one_child": 1821.93,
          "veteran_one_parent_one_child": 1582.93,
          "veteran_two_parents_one_child": 1684.93
        },
        "addons": {
          "additional_child_under_18": 63.00,
          "additional_child_over_18_school": 205.00,
          "spouse_aid_and_attendance": 117.00
        }
      },
      "70%": {
        "base": {
          "veteran_alone": 1759.19,
          "veteran_spouse": 1908.19,
          "veteran_spouse_one_parent": 2028.19,
          "veteran_spouse_two_parents": 2148.19,
          "veteran_one_parent": 1879.19,
          "veteran_two_parents": 1999.19,
          "veteran_one_child": 1858.19,
          "veteran_spouse_one_child": 2018.19,
          "veteran_spouse_one_parent_one_child": 2138.19,
          "veteran_spouse_two_parents_one_child": 2258.19,
          "veteran_one_parent_one_child": 1978.19,
          "veteran_two_parents_one_child": 2098.19
        },
        "addons": {
          "additional_child_under_18": 74.00,
          "additional_child_over_18_school": 239.00,
          "spouse_aid_and_attendance": 137.00
        }
      },
      "80%": {
        "base": {
          "veteran_alone": 2044.89,
          "veteran_spouse": 2214.89,
          "veteran_spouse_one_parent": 2351.89,
          "veteran_spouse_two_parents": 2488.89,
          "veteran_one_parent": 2181.89,
          "veteran_two_parents": 2318.89,
          "veteran_one_child": 2158.89,
          "veteran_spouse_one_child": 2340.89,
          "veteran_spouse_one_parent_one_child": 2477.89,
          "veteran_spouse_two_parents_one_child": 2614.89,
          "veteran_one_parent_one_child": 2295.89,
          "veteran_two_parents_one_child": 2432.89
        },
        "addons": {
          "additional_child_under_18": 84.00,
          "additional_child_over_18_school": 274.00,
          "spouse_aid_and_attendance": 157.00
        }
      },
      "90%": {
        "base": {
          "veteran_alone": 2297.96,
          "veteran_spouse": 2489.96,
          "veteran_spouse_one_parent": 2643.96,
          "veteran_spouse_two_parents": 2797.96,
          "veteran_one_parent": 2451.96,
          "veteran_two_parents": 2605.96,
          "veteran_one_child": 2425.96,
          "veteran_spouse_one_child": 2630.96,
          "veteran_spouse_one_parent_one_child": 2784.96,
          "veteran_spouse_two_parents_one_child": 2938.96,
          "veteran_one_parent_one_child": 2579.96,
          "veteran_two_parents_one_child": 2733.96
        },
        "addons": {
          "additional_child_under_18": 95.00,
          "additional_child_over_18_school": 308.00,
          "spouse_aid_and_attendance": 176.00
        }
      },
      "100%": {
        "base": {
          "veteran_alone": 3831.30,
          "veteran_spouse": 4044.91,
          "veteran_spouse_one_parent": 4216.35,
          "veteran_spouse_two_parents": 4387.79,
          "veteran_one_parent": 4002.74,
          "veteran_two_parents": 4174.18,
          "veteran_one_child": 3974.15,
          "veteran_spouse_one_child": 4201.35,
          "veteran_spouse_one_parent_one_child": 4372.79,
          "veteran_spouse_two_parents_one_child": 4544.23,
          "veteran_one_parent_one_child": 4145.59,
          "veteran_two_parents_one_child": 4317.03
        },
        "addons": {
          "additional_child_under_18": 106.14,
          "additional_child_over_18_school": 342.85,
          "spouse_aid_and_attendance": 195.92
        }
      },
      "smc_k": {
        "amount": 136.06
      },
      "smc_l": {
        "base": {
          "veteran_alone": 4767.34,
          "veteran_spouse": 4980.95,
          "veteran_spouse_one_parent": 5152.39,
          "veteran_spouse_two_parents": 5323.83,
          "veteran_one_parent": 4938.78,
          "veteran_two_parents": 5110.22,
          "veteran_one_child": 4910.19,
          "veteran_spouse_one_child": 5137.39,
          "veteran_spouse_one_parent_one_child": 5308.83,
          "veteran_spouse_two_parents_one_child": 5480.27,
          "veteran_one_parent_one_child": 5081.63,
          "veteran_two_parents_one_child": 5253.07
        },
        "addons": {
          "additional_child_under_18": 106.14,
          "additional_child_over_18_school": 342.85,
          "spouse_aid_and_attendance": 195.92
        }
      },
      "smc_l_half": {
        "base": {
          "veteran_alone": 5014.00,
          "veteran_spouse": 5227.61,
          "veteran_spouse_one_parent": 5399.05,
          "veteran_spouse_two_parents": 5570.49,
          "veteran_one_parent": 5185.44,
          "veteran_two_parents": 5356.88,
          "veteran_one_child": 5156.85,
          "veteran_spouse_one_child": 5384.05,
          "veteran_spouse_one_parent_one_child": 5555.49,
          "veteran_spouse_two_parents_one_child": 5726.93,
          "veteran_one_parent_one_child": 5328.29,
          "veteran_two_parents_one_child": 5499.73
        },
        "addons": {
          "additional_child_under_18": 106.14,
          "additional_child_over_18_school": 342.85,
          "spouse_aid_and_attendance": 195.92
        }
      },
      "smc_m": {
        "base": {
          "veteran_alone": 5261.24,
          "veteran_spouse": 5474.85,
          "veteran_spouse_one_parent": 5646.29,
          "veteran_spouse_two_parents": 5817.73,
          "veteran_one_parent": 5432.68,
          "veteran_two_parents": 5604.12,
          "veteran_one_child": 5404.09,
          "veteran_spouse_one_child": 5631.29,
          "veteran_spouse_one_parent_one_child": 5802.73,
          "veteran_spouse_two_parents_one_child": 5974.17,
          "veteran_one_parent_one_child": 5575.53,
          "veteran_two_parents_one_child": 5746.97
        },
        "addons": {
          "additional_child_under_18": 106.14,
          "additional_child_over_18_school": 342.85,
          "spouse_aid_and_attendance": 195.92
        }
      },
      "smc_m_half": {
        "base": {
          "veteran_alone": 5623.00,
          "veteran_spouse": 5836.61,
          "veteran_spouse_one_parent": 6008.05,
          "veteran_spouse_two_parents": 6179.49,
          "veteran_one_parent": 5794.44,
          "veteran_two_parents": 5965.88,
          "veteran_one_child": 5765.85,
          "veteran_spouse_one_child": 5993.05,
          "veteran_spouse_one_parent_one_child": 6164.49,
          "veteran_spouse_two_parents_one_child": 6335.93,
          "veteran_one_parent_one_child": 5937.29,
          "veteran_two_parents_one_child": 6108.73
        },
        "addons": {
          "additional_child_under_18": 106.14,
          "additional_child_over_18_school": 342.85,
          "spouse_aid_and_attendance": 195.92
        }
      },
      "smc_n": {
        "base": {
          "veteran_alone": 5985.06,
          "veteran_spouse": 6198.67,
          "veteran_spouse_one_parent": 6370.11,
          "veteran_spouse_two_parents": 6541.55,
          "veteran_one_parent": 6156.50,
          "veteran_two_parents": 6327.94,
          "veteran_one_child": 6127.91,
          "veteran_spouse_one_child": 6355.11,
          "veteran_spouse_one_parent_one_child": 6526.55,
          "veteran_spouse_two_parents_one_child": 6697.99,
          "veteran_one_parent_one_child": 6299.35,
          "veteran_two_parents_one_child": 6470.79
        },
        "addons": {
          "additional_child_under_18": 106.14,
          "additional_child_over_18_school": 342.85,
          "spouse_aid_and_attendance": 195.92
        }
      },
      "smc_n_half": {
        "base": {
          "veteran_alone": 6337.00,
          "veteran_spouse": 6550.61,
          "veteran_spouse_one_parent": 6722.05,
          "veteran_spouse_two_parents": 6893.49,
          "veteran_one_parent": 6508.44,
          "veteran_two_parents": 6679.88,
          "veteran_one_child": 6479.85,
          "veteran_spouse_one_child": 6707.05,
          "veteran_spouse_one_parent_one_child": 6878.49,
          "veteran_spouse_two_parents_one_child": 7049.93,
          "veteran_one_parent_one_child": 6651.29,
          "veteran_two_parents_one_child": 6822.73
        },
        "addons": {
          "additional_child_under_18": 106.14,
          "additional_child_over_18_school": 342.85,
          "spouse_aid_and_attendance": 195.92
        }
      },
      "smc_op": {
        "base": {
          "veteran_alone": 6689.81,
          "veteran_spouse": 6903.42,
          "veteran_spouse_one_parent": 7074.86,
          "veteran_spouse_two_parents": 7246.30,
          "veteran_one_parent": 6861.25,
          "veteran_two_parents": 7032.69,
          "veteran_one_child": 6832.66,
          "veteran_spouse_one_child": 7059.86,
          "veteran_spouse_one_parent_one_child": 7231.30,
          "veteran_spouse_two_parents_one_child": 7402.74,
          "veteran_one_parent_one_child": 7004.10,
          "veteran_two_parents_one_child": 7175.54
        },
        "addons": {
          "additional_child_under_18": 106.14,
          "additional_child_over_18_school": 342.85,
          "spouse_aid_and_attendance": 195.92
        }
      },
      "smc_r1": {
        "base": {
          "veteran_alone": 9559.22,
          "veteran_spouse": 9772.83,
          "veteran_spouse_one_parent": 9944.27,
          "veteran_spouse_two_parents": 10115.71,
          "veteran_one_parent": 9730.66,
          "veteran_two_parents": 9902.10,
          "veteran_one_child": 9702.07,
          "veteran_spouse_one_child": 9929.27,
          "veteran_spouse_one_parent_one_child": 10100.71,
          "veteran_spouse_two_parents_one_child": 10272.15,
          "veteran_one_parent_one_child": 9873.51,
          "veteran_two_parents_one_child": 10044.95
        },
        "addons": {
          "additional_child_under_18": 106.14,
          "additional_child_over_18_school": 342.85,
          "spouse_aid_and_attendance": 195.92
        }
      },
      "smc_r2_t": {
        "base": {
          "veteran_alone": 10964.66,
          "veteran_spouse": 11178.27,
          "veteran_spouse_one_parent": 11349.71,
          "veteran_spouse_two_parents": 11521.15,
          "veteran_one_parent": 11136.10,
          "veteran_two_parents": 11307.54,
          "veteran_one_child": 11107.51,
          "veteran_spouse_one_child": 11334.71,
          "veteran_spouse_one_parent_one_child": 11506.15,
          "veteran_spouse_two_parents_one_child": 11677.59,
          "veteran_one_parent_one_child": 11278.95,
          "veteran_two_parents_one_child": 11450.39
        },
        "addons": {
          "additional_child_under_18": 106.14,
          "additional_child_over_18_school": 342.85,
          "spouse_aid_and_attendance": 195.92
        }
      },
      "smc_s": {
        "base": {
          "veteran_alone": 4288.45,
          "veteran_spouse": 4502.06,
          "veteran_spouse_one_parent": 4673.50,
          "veteran_spouse_two_parents": 4844.94,
          "veteran_one_parent": 4459.89,
          "veteran_two_parents": 4631.33,
          "veteran_one_child": 4431.30,
          "veteran_spouse_one_child": 4658.50,
          "veteran_spouse_one_parent_one_child": 4829.94,
          "veteran_spouse_two_parents_one_child": 5001.38,
          "veteran_one_parent_one_child": 4602.74,
          "veteran_two_parents_one_child": 4774.18
        },
        "addons": {
          "additional_child_under_18": 106.14,
          "additional_child_over_18_school": 342.85,
          "spouse_aid_and_attendance": 195.92
        }
      }
    }
  }, 
  {
    "cola_year": "2024",
    "effective_date": "2023-12-01",
    "rates": {
      "10%": {
        "flat": 171.23
      },
      "20%": {
        "flat": 338.49
      },
      "30%": {
        "base": {
          "veteran_alone": 524.31,
          "veteran_spouse": 586.31,
          "veteran_spouse_one_parent": 636.31,
          "veteran_spouse_two_parents": 686.31,
          "veteran_one_parent": 574.31,
          "veteran_two_parents": 624.31,
          "veteran_one_child": 565.31,
          "veteran_spouse_one_child": 632.31,
          "veteran_spouse_one_parent_one_child": 682.31,
          "veteran_spouse_two_parents_one_child": 732.31,
          "veteran_one_parent_one_child": 615.31,
          "veteran_two_parents_one_child": 665.31
        },
        "addons": {
          "additional_child_under_18": 31.00,
          "additional_child_over_18_school": 100.00,
          "spouse_aid_and_attendance": 57.00
        }
      },
      "40%": {
        "base": {
          "veteran_alone": 755.28,
          "veteran_spouse": 838.28,
          "veteran_spouse_one_parent": 904.28,
          "veteran_spouse_two_parents": 970.28,
          "veteran_one_parent": 821.28,
          "veteran_two_parents": 887.28,
          "veteran_one_child": 810.28,
          "veteran_spouse_one_child": 899.28,
          "veteran_spouse_one_parent_one_child": 965.28,
          "veteran_spouse_two_parents_one_child": 1031.28,
          "veteran_one_parent_one_child": 876.28,
          "veteran_two_parents_one_child": 942.28
        },
        "addons": {
          "additional_child_under_18": 41.00,
          "additional_child_over_18_school": 133.00,
          "spouse_aid_and_attendance": 76.00
        }
      },
      "50%": {
        "base": {
          "veteran_alone": 1075.16,
          "veteran_spouse": 1179.16,
          "veteran_spouse_one_parent": 1262.16,
          "veteran_spouse_two_parents": 1345.16,
          "veteran_one_parent": 1158.16,
          "veteran_two_parents": 1241.16,
          "veteran_one_child": 1144.16,
          "veteran_spouse_one_child": 1255.16,
          "veteran_spouse_one_parent_one_child": 1338.16,
          "veteran_spouse_two_parents_one_child": 1421.16,
          "veteran_one_parent_one_child": 1227.16,
          "veteran_two_parents_one_child": 1310.16
        },
        "addons": {
          "additional_child_under_18": 51.00,
          "additional_child_over_18_school": 167.00,
          "spouse_aid_and_attendance": 95.00
        }
      },
      "60%": {
        "base": {
          "veteran_alone": 1361.88,
          "veteran_spouse": 1486.88,
          "veteran_spouse_one_parent": 1586.88,
          "veteran_spouse_two_parents": 1686.88,
          "veteran_one_parent": 1461.88,
          "veteran_two_parents": 1561.88,
          "veteran_one_child": 1444.88,
          "veteran_spouse_one_child": 1577.88,
          "veteran_spouse_one_parent_one_child": 1677.88,
          "veteran_spouse_two_parents_one_child": 1777.88,
          "veteran_one_parent_one_child": 1544.88,
          "veteran_two_parents_one_child": 1644.88
        },
        "addons": {
          "additional_child_under_18": 62.00,
          "additional_child_over_18_school": 200.00,
          "spouse_aid_and_attendance": 114.00
        }
      },
      "70%": {
        "base": {
          "veteran_alone": 1716.28,
          "veteran_spouse": 1861.28,
          "veteran_spouse_one_parent": 1978.28,
          "veteran_spouse_two_parents": 2095.28,
          "veteran_one_parent": 1833.28,
          "veteran_two_parents": 1950.28,
          "veteran_one_child": 1813.28,
          "veteran_spouse_one_child": 1968.28,
          "veteran_spouse_one_parent_one_child": 2085.28,
          "veteran_spouse_two_parents_one_child": 2202.28,
          "veteran_one_parent_one_child": 1930.28,
          "veteran_two_parents_one_child": 2047.28
        },
        "addons": {
          "additional_child_under_18": 72.00,
          "additional_child_over_18_school": 234.00,
          "spouse_aid_and_attendance": 134.00
        }
      },
      "80%": {
        "base": {
          "veteran_alone": 1995.01,
          "veteran_spouse": 2161.01,
          "veteran_spouse_one_parent": 2294.01,
          "veteran_spouse_two_parents": 2427.01,
          "veteran_one_parent": 2128.01,
          "veteran_two_parents": 2261.01,
          "veteran_one_child": 2106.01,
          "veteran_spouse_one_child": 2283.01,
          "veteran_spouse_one_parent_one_child": 2416.01,
          "veteran_spouse_two_parents_one_child": 2549.01,
          "veteran_one_parent_one_child": 2239.01,
          "veteran_two_parents_one_child": 2372.01
        },
        "addons": {
          "additional_child_under_18": 82.00,
          "additional_child_over_18_school": 267.00,
          "spouse_aid_and_attendance": 153.00
        }
      },
      "90%": {
        "base": {
          "veteran_alone": 2241.91,
          "veteran_spouse": 2428.91,
          "veteran_spouse_one_parent": 2578.91,
          "veteran_spouse_two_parents": 2728.91,
          "veteran_one_parent": 2391.91,
          "veteran_two_parents": 2541.91,
          "veteran_one_child": 2366.91,
          "veteran_spouse_one_child": 2565.91,
          "veteran_spouse_one_parent_one_child": 2715.91,
          "veteran_spouse_two_parents_one_child": 2865.91,
          "veteran_one_parent_one_child": 2516.91,
          "veteran_two_parents_one_child": 2666.91
        },
        "addons": {
          "additional_child_under_18": 93.00,
          "additional_child_over_18_school": 301.00,
          "spouse_aid_and_attendance": 172.00
        }
      },
      "100%": {
        "base": {
          "veteran_alone": 3737.85,
          "veteran_spouse": 3946.25,
          "veteran_spouse_one_parent": 4113.51,
          "veteran_spouse_two_parents": 4280.77,
          "veteran_one_parent": 3905.11,
          "veteran_two_parents": 4072.37,
          "veteran_one_child": 3877.22,
          "veteran_spouse_one_child": 4098.87,
          "veteran_spouse_one_parent_one_child": 4266.13,
          "veteran_spouse_two_parents_one_child": 4433.39,
          "veteran_one_parent_one_child": 4044.48,
          "veteran_two_parents_one_child": 4211.74
        },
        "addons": {
          "additional_child_under_18": 103.55,
          "additional_child_over_18_school": 334.49,
          "spouse_aid_and_attendance": 191.14
        }
      },
      "smc_k": {
        "amount": 132.74
      },
      "smc_l": {
        "base": {
          "veteran_alone": 4651.06,
          "veteran_spouse": 4859.46,
          "veteran_spouse_one_parent": 5026.72,
          "veteran_spouse_two_parents": 5193.98,
          "veteran_one_parent": 4818.32,
          "veteran_two_parents": 4985.58,
          "veteran_one_child": 4790.43,
          "veteran_spouse_one_child": 5012.08,
          "veteran_spouse_one_parent_one_child": 5179.34,
          "veteran_spouse_two_parents_one_child": 5346.60,
          "veteran_one_parent_one_child": 4957.69,
          "veteran_two_parents_one_child": 5124.95
        },
        "addons": {
          "additional_child_under_18": 103.55,
          "additional_child_over_18_school": 334.49,
          "spouse_aid_and_attendance": 191.14
        }
      },
      "smc_l_half": {
        "base": {
          "veteran_alone": 4891.50,
          "veteran_spouse": 5099.90,
          "veteran_spouse_one_parent": 5267.16,
          "veteran_spouse_two_parents": 5434.42,
          "veteran_one_parent": 5058.76,
          "veteran_two_parents": 5226.02,
          "veteran_one_child": 5030.87,
          "veteran_spouse_one_child": 5252.52,
          "veteran_spouse_one_parent_one_child": 5419.78,
          "veteran_spouse_two_parents_one_child": 5587.04,
          "veteran_one_parent_one_child": 5198.13,
          "veteran_two_parents_one_child": 5365.39
        },
        "addons": {
          "additional_child_under_18": 103.55,
          "additional_child_over_18_school": 334.49,
          "spouse_aid_and_attendance": 191.14
        }
      },
      "smc_m": {
        "base": {
          "veteran_alone": 5132.92,
          "veteran_spouse": 5341.32,
          "veteran_spouse_one_parent": 5508.58,
          "veteran_spouse_two_parents": 5675.84,
          "veteran_one_parent": 5300.18,
          "veteran_two_parents": 5467.44,
          "veteran_one_child": 5272.29,
          "veteran_spouse_one_child": 5493.94,
          "veteran_spouse_one_parent_one_child": 5661.20,
          "veteran_spouse_two_parents_one_child": 5828.46,
          "veteran_one_parent_one_child": 5439.55,
          "veteran_two_parents_one_child": 5606.81
        },
        "addons": {
          "additional_child_under_18": 103.55,
          "additional_child_over_18_school": 334.49,
          "spouse_aid_and_attendance": 191.14
        }
      },
      "smc_m_half": {
        "base": {
          "veteran_alone": 5485.61,
          "veteran_spouse": 5694.01,
          "veteran_spouse_one_parent": 5861.27,
          "veteran_spouse_two_parents": 6028.53,
          "veteran_one_parent": 5652.87,
          "veteran_two_parents": 5820.13,
          "veteran_one_child": 5624.98,
          "veteran_spouse_one_child": 5846.63,
          "veteran_spouse_one_parent_one_child": 6013.89,
          "veteran_spouse_two_parents_one_child": 6181.15,
          "veteran_one_parent_one_child": 5792.24,
          "veteran_two_parents_one_child": 5959.50
        },
        "addons": {
          "additional_child_under_18": 103.55,
          "additional_child_over_18_school": 334.49,
          "spouse_aid_and_attendance": 191.14
        }
      },
      "smc_n": {
        "base": {
          "veteran_alone": 5839.08,
          "veteran_spouse": 6047.48,
          "veteran_spouse_one_parent": 6214.74,
          "veteran_spouse_two_parents": 6382.00,
          "veteran_one_parent": 6006.34,
          "veteran_two_parents": 6173.60,
          "veteran_one_child": 5978.45,
          "veteran_spouse_one_child": 6200.10,
          "veteran_spouse_one_parent_one_child": 6367.36,
          "veteran_spouse_two_parents_one_child": 6534.62,
          "veteran_one_parent_one_child": 6145.71,
          "veteran_two_parents_one_child": 6312.97
        },
        "addons": {
          "additional_child_under_18": 103.55,
          "additional_child_over_18_school": 334.49,
          "spouse_aid_and_attendance": 191.14
        }
      },
      "smc_n_half": {
        "base": {
          "veteran_alone": 6182.55,
          "veteran_spouse": 6390.95,
          "veteran_spouse_one_parent": 6558.21,
          "veteran_spouse_two_parents": 6725.47,
          "veteran_one_parent": 6349.81,
          "veteran_two_parents": 6517.07,
          "veteran_one_child": 6321.92,
          "veteran_spouse_one_child": 6543.57,
          "veteran_spouse_one_parent_one_child": 6710.83,
          "veteran_spouse_two_parents_one_child": 6878.09,
          "veteran_one_parent_one_child": 6489.18,
          "veteran_two_parents_one_child": 6656.44
        },
        "addons": {
          "additional_child_under_18": 103.55,
          "additional_child_over_18_school": 334.49,
          "spouse_aid_and_attendance": 191.14
        }
      },
      "smc_op": {
        "base": {
          "veteran_alone": 6526.64,
          "veteran_spouse": 6735.04,
          "veteran_spouse_one_parent": 6902.30,
          "veteran_spouse_two_parents": 7069.56,
          "veteran_one_parent": 6693.90,
          "veteran_two_parents": 6861.16,
          "veteran_one_child": 6666.01,
          "veteran_spouse_one_child": 6887.66,
          "veteran_spouse_one_parent_one_child": 7054.92,
          "veteran_spouse_two_parents_one_child": 7222.18,
          "veteran_one_parent_one_child": 6833.27,
          "veteran_two_parents_one_child": 7000.53
        },
        "addons": {
          "additional_child_under_18": 103.55,
          "additional_child_over_18_school": 334.49,
          "spouse_aid_and_attendance": 191.14
        }
      },
      "smc_r1": {
        "base": {
          "veteran_alone": 9326.07,
          "veteran_spouse": 9534.47,
          "veteran_spouse_one_parent": 9701.73,
          "veteran_spouse_two_parents": 9868.99,
          "veteran_one_parent": 9493.33,
          "veteran_two_parents": 9660.59,
          "veteran_one_child": 9465.44,
          "veteran_spouse_one_child": 9687.09,
          "veteran_spouse_one_parent_one_child": 9854.35,
          "veteran_spouse_two_parents_one_child": 10021.61,
          "veteran_one_parent_one_child": 9632.70,
          "veteran_two_parents_one_child": 9799.96
        },
        "addons": {
          "additional_child_under_18": 103.55,
          "additional_child_over_18_school": 334.49,
          "spouse_aid_and_attendance": 191.14
        }
      },
      "smc_r2_t": {
        "base": {
          "veteran_alone": 10697.23,
          "veteran_spouse": 10905.63,
          "veteran_spouse_one_parent": 11072.89,
          "veteran_spouse_two_parents": 11240.15,
          "veteran_one_parent": 10864.49,
          "veteran_two_parents": 11031.75,
          "veteran_one_child": 10836.60,
          "veteran_spouse_one_child": 11058.25,
          "veteran_spouse_one_parent_one_child": 11225.51,
          "veteran_spouse_two_parents_one_child": 11392.77,
          "veteran_one_parent_one_child": 11003.86,
          "veteran_two_parents_one_child": 11171.12
        },
        "addons": {
          "additional_child_under_18": 103.55,
          "additional_child_over_18_school": 334.49,
          "spouse_aid_and_attendance": 191.14
        }
      },
      "smc_s": {
        "base": {
          "veteran_alone": 4183.85,
          "veteran_spouse": 4392.25,
          "veteran_spouse_one_parent": 4559.51,
          "veteran_spouse_two_parents": 4726.77,
          "veteran_one_parent": 4351.11,
          "veteran_two_parents": 4518.37,
          "veteran_one_child": 4323.22,
          "veteran_spouse_one_child": 4544.87,
          "veteran_spouse_one_parent_one_child": 4712.13,
          "veteran_spouse_two_parents_one_child": 4879.39,
          "veteran_one_parent_one_child": 4490.48,
          "veteran_two_parents_one_child": 4657.74
        },
        "addons": {
          "additional_child_under_18": 103.55,
          "additional_child_over_18_school": 334.49,
          "spouse_aid_and_attendance": 191.14
        }
      }
    }
  }, 
  {
    "cola_year": "2023",
    "effective_date": "2022-12-01",
    "rates": {
      "10%": {
        "flat": 165.92
      },
      "20%": {
        "flat": 327.99
      },
      "30%": {
        "base": {
          "veteran_alone": 508.05,
          "veteran_spouse": 568.05,
          "veteran_spouse_one_parent": 617.05,
          "veteran_spouse_two_parents": 666.05,
          "veteran_one_parent": 557.05,
          "veteran_two_parents": 606.05,
          "veteran_one_child": 548.05,
          "veteran_spouse_one_child": 612.05,
          "veteran_spouse_one_parent_one_child": 661.05,
          "veteran_spouse_two_parents_one_child": 710.05,
          "veteran_one_parent_one_child": 597.05,
          "veteran_two_parents_one_child": 646.05
        },
        "addons": {
          "additional_child_under_18": 30.00,
          "additional_child_over_18_school": 97.00,
          "spouse_aid_and_attendance": 55.00
        }
      },
      "40%": {
        "base": {
          "veteran_alone": 731.86,
          "veteran_spouse": 812.86,
          "veteran_spouse_one_parent": 876.86,
          "veteran_spouse_two_parents": 940.86,
          "veteran_one_parent": 795.86,
          "veteran_two_parents": 859.86,
          "veteran_one_child": 785.86,
          "veteran_spouse_one_child": 871.86,
          "veteran_spouse_one_parent_one_child": 935.86,
          "veteran_spouse_two_parents_one_child": 999.86,
          "veteran_one_parent_one_child": 849.86,
          "veteran_two_parents_one_child": 913.86
        },
        "addons": {
          "additional_child_under_18": 40.00,
          "additional_child_over_18_school": 129.00,
          "spouse_aid_and_attendance": 74.00
        }
      },
      "50%": {
        "base": {
          "veteran_alone": 1041.82,
          "veteran_spouse": 1142.82,
          "veteran_spouse_one_parent": 1223.82,
          "veteran_spouse_two_parents": 1304.82,
          "veteran_one_parent": 1122.82,
          "veteran_two_parents": 1203.82,
          "veteran_one_child": 1108.82,
          "veteran_spouse_one_child": 1216.82,
          "veteran_spouse_one_parent_one_child": 1297.82,
          "veteran_spouse_two_parents_one_child": 1378.82,
          "veteran_one_parent_one_child": 1189.82,
          "veteran_two_parents_one_child": 1270.82
        },
        "addons": {
          "additional_child_under_18": 50.00,
          "additional_child_over_18_school": 162.00,
          "spouse_aid_and_attendance": 92.00
        }
      },
      "60%": {
        "base": {
          "veteran_alone": 1319.65,
          "veteran_spouse": 1441.65,
          "veteran_spouse_one_parent": 1539.65,
          "veteran_spouse_two_parents": 1637.65,
          "veteran_one_parent": 1417.65,
          "veteran_two_parents": 1515.65,
          "veteran_one_child": 1400.65,
          "veteran_spouse_one_child": 1529.65,
          "veteran_spouse_one_parent_one_child": 1627.65,
          "veteran_spouse_two_parents_one_child": 1725.65,
          "veteran_one_parent_one_child": 1498.65,
          "veteran_two_parents_one_child": 1596.65
        },
        "addons": {
          "additional_child_under_18": 60.00,
          "additional_child_over_18_school": 194.00,
          "spouse_aid_and_attendance": 111.00
        }
      },
      "70%": {
        "base": {
          "veteran_alone": 1663.06,
          "veteran_spouse": 1804.06,
          "veteran_spouse_one_parent": 1918.06,
          "veteran_spouse_two_parents": 2032.06,
          "veteran_one_parent": 1777.06,
          "veteran_two_parents": 1891.06,
          "veteran_one_child": 1757.06,
          "veteran_spouse_one_child": 1908.06,
          "veteran_spouse_one_parent_one_child": 2022.06,
          "veteran_spouse_two_parents_one_child": 2136.06,
          "veteran_one_parent_one_child": 1871.06,
          "veteran_two_parents_one_child": 1985.06
        },
        "addons": {
          "additional_child_under_18": 70.00,
          "additional_child_over_18_school": 226.00,
          "spouse_aid_and_attendance": 130.00
        }
      },
      "80%": {
        "base": {
          "veteran_alone": 1933.15,
          "veteran_spouse": 2095.15,
          "veteran_spouse_one_parent": 2225.15,
          "veteran_spouse_two_parents": 2355.15,
          "veteran_one_parent": 2063.15,
          "veteran_two_parents": 2193.15,
          "veteran_one_child": 2041.15,
          "veteran_spouse_one_child": 2213.15,
          "veteran_spouse_one_parent_one_child": 2343.15,
          "veteran_spouse_two_parents_one_child": 2473.15,
          "veteran_one_parent_one_child": 2171.15,
          "veteran_two_parents_one_child": 2301.15
        },
        "addons": {
          "additional_child_under_18": 80.00,
          "additional_child_over_18_school": 259.00,
          "spouse_aid_and_attendance": 148.00
        }
      },
      "90%": {
        "base": {
          "veteran_alone": 2172.39,
          "veteran_spouse": 2353.39,
          "veteran_spouse_one_parent": 2500.39,
          "veteran_spouse_two_parents": 2647.39,
          "veteran_one_parent": 2319.39,
          "veteran_two_parents": 2466.39,
          "veteran_one_child": 2294.39,
          "veteran_spouse_one_child": 2486.39,
          "veteran_spouse_one_parent_one_child": 2633.39,
          "veteran_spouse_two_parents_one_child": 2780.39,
          "veteran_one_parent_one_child": 2441.39,
          "veteran_two_parents_one_child": 2588.39
        },
        "addons": {
          "additional_child_under_18": 90.00,
          "additional_child_over_18_school": 292.00,
          "spouse_aid_and_attendance": 167.00
        }
      },
      "100%": {
        "base": {
          "veteran_alone": 3621.95,
          "veteran_spouse": 3824.93,
          "veteran_spouse_one_parent": 3987.75,
          "veteran_spouse_two_parents": 4150.57,
          "veteran_one_parent": 3784.77,
          "veteran_two_parents": 3947.59,
          "veteran_one_child": 3758.56,
          "veteran_spouse_one_child": 3974.20,
          "veteran_spouse_one_parent_one_child": 4137.02,
          "veteran_spouse_two_parents_one_child": 4299.84,
          "veteran_one_parent_one_child": 3921.38,
          "veteran_two_parents_one_child": 4084.20
        },
        "addons": {
          "additional_child_under_18": 100.34,
          "additional_child_over_18_school": 324.12,
          "spouse_aid_and_attendance": 185.21
        }
      },
      "smc_k": {
        "amount": 128.62
      },
      "smc_l": {
        "base": {
          "veteran_alone": 4506.27,
          "veteran_spouse": 4709.25,
          "veteran_spouse_one_parent": 4872.07,
          "veteran_spouse_two_parents": 5034.89,
          "veteran_one_parent": 4669.09,
          "veteran_two_parents": 4831.91,
          "veteran_one_child": 4642.88,
          "veteran_spouse_one_child": 4858.52,
          "veteran_spouse_one_parent_one_child": 5021.34,
          "veteran_spouse_two_parents_one_child": 5184.16,
          "veteran_one_parent_one_child": 4805.70,
          "veteran_two_parents_one_child": 4968.52
        },
        "addons": {
          "additional_child_under_18": 100.34,
          "additional_child_over_18_school": 324.12,
          "spouse_aid_and_attendance": 185.21
        }
      },
      "smc_l_half": {
        "base": {
          "veteran_alone": 4738.98,
          "veteran_spouse": 4941.96,
          "veteran_spouse_one_parent": 5104.78,
          "veteran_spouse_two_parents": 5267.60,
          "veteran_one_parent": 4901.80,
          "veteran_two_parents": 5064.62,
          "veteran_one_child": 4875.59,
          "veteran_spouse_one_child": 5091.23,
          "veteran_spouse_one_parent_one_child": 5254.05,
          "veteran_spouse_two_parents_one_child": 5416.87,
          "veteran_one_parent_one_child": 5038.41,
          "veteran_two_parents_one_child": 5201.23
        },
        "addons": {
          "additional_child_under_18": 100.34,
          "additional_child_over_18_school": 324.12,
          "spouse_aid_and_attendance": 185.21
        }
      },
      "smc_m": {
        "base": {
          "veteran_alone": 4972.29,
          "veteran_spouse": 5175.27,
          "veteran_spouse_one_parent": 5338.09,
          "veteran_spouse_two_parents": 5500.91,
          "veteran_one_parent": 5135.11,
          "veteran_two_parents": 5297.93,
          "veteran_one_child": 5108.90,
          "veteran_spouse_one_child": 5324.54,
          "veteran_spouse_one_parent_one_child": 5487.36,
          "veteran_spouse_two_parents_one_child": 5650.18,
          "veteran_one_parent_one_child": 5271.72,
          "veteran_two_parents_one_child": 5434.54
        },
        "addons": {
          "additional_child_under_18": 100.34,
          "additional_child_over_18_school": 324.12,
          "spouse_aid_and_attendance": 185.21
        }
      },
      "smc_m_half": {
        "base": {
          "veteran_alone": 5316.06,
          "veteran_spouse": 5519.04,
          "veteran_spouse_one_parent": 5681.86,
          "veteran_spouse_two_parents": 5844.68,
          "veteran_one_parent": 5478.88,
          "veteran_two_parents": 5641.70,
          "veteran_one_child": 5452.67,
          "veteran_spouse_one_child": 5668.31,
          "veteran_spouse_one_parent_one_child": 5831.13,
          "veteran_spouse_two_parents_one_child": 5993.95,
          "veteran_one_parent_one_child": 5615.49,
          "veteran_two_parents_one_child": 5778.31
        },
        "addons": {
          "additional_child_under_18": 100.34,
          "additional_child_over_18_school": 324.12,
          "spouse_aid_and_attendance": 185.21
        }
      },
      "smc_n": {
        "base": {
          "veteran_alone": 5660.16,
          "veteran_spouse": 5863.14,
          "veteran_spouse_one_parent": 6025.96,
          "veteran_spouse_two_parents": 6188.78,
          "veteran_one_parent": 5822.98,
          "veteran_two_parents": 5985.80,
          "veteran_one_child": 5796.77,
          "veteran_spouse_one_child": 6012.41,
          "veteran_spouse_one_parent_one_child": 6175.23,
          "veteran_spouse_two_parents_one_child": 6338.05,
          "veteran_one_parent_one_child": 5959.59,
          "veteran_two_parents_one_child": 6122.41
        },
        "addons": {
          "additional_child_under_18": 100.34,
          "additional_child_over_18_school": 324.12,
          "spouse_aid_and_attendance": 185.21
        }
      },
      "smc_n_half": {
        "base": {
          "veteran_alone": 5992.87,
          "veteran_spouse": 6195.85,
          "veteran_spouse_one_parent": 6358.67,
          "veteran_spouse_two_parents": 6521.49,
          "veteran_one_parent": 6155.69,
          "veteran_two_parents": 6318.51,
          "veteran_one_child": 6129.48,
          "veteran_spouse_one_child": 6345.12,
          "veteran_spouse_one_parent_one_child": 6507.94,
          "veteran_spouse_two_parents_one_child": 6670.76,
          "veteran_one_parent_one_child": 6292.30,
          "veteran_two_parents_one_child": 6455.12
        },
        "addons": {
          "additional_child_under_18": 100.34,
          "additional_child_over_18_school": 324.12,
          "spouse_aid_and_attendance": 185.21
        }
      },
      "smc_op": {
        "base": {
          "veteran_alone": 6325.95,
          "veteran_spouse": 6528.93,
          "veteran_spouse_one_parent": 6691.75,
          "veteran_spouse_two_parents": 6854.57,
          "veteran_one_parent": 6488.77,
          "veteran_two_parents": 6651.59,
          "veteran_one_child": 6462.56,
          "veteran_spouse_one_child": 6678.20,
          "veteran_spouse_one_parent_one_child": 6841.02,
          "veteran_spouse_two_parents_one_child": 7003.84,
          "veteran_one_parent_one_child": 6625.38,
          "veteran_two_parents_one_child": 6788.20
        },
        "addons": {
          "additional_child_under_18": 100.34,
          "additional_child_over_18_school": 324.12,
          "spouse_aid_and_attendance": 185.21
        }
      },
      "smc_r1": {
        "base": {
          "veteran_alone": 9040.67,
          "veteran_spouse": 9243.65,
          "veteran_spouse_one_parent": 9406.47,
          "veteran_spouse_two_parents": 9569.29,
          "veteran_one_parent": 9203.49,
          "veteran_two_parents": 9366.31,
          "veteran_one_child": 9177.28,
          "veteran_spouse_one_child": 9392.92,
          "veteran_spouse_one_parent_one_child": 9555.74,
          "veteran_spouse_two_parents_one_child": 9718.56,
          "veteran_one_parent_one_child": 9340.10,
          "veteran_two_parents_one_child": 9502.92
        },
        "addons": {
          "additional_child_under_18": 100.34,
          "additional_child_over_18_school": 324.12,
          "spouse_aid_and_attendance": 185.21
        }
      },
      "smc_r2_t": {
        "base": {
          "veteran_alone": 10367.96,
          "veteran_spouse": 10570.94,
          "veteran_spouse_one_parent": 10733.76,
          "veteran_spouse_two_parents": 10896.58,
          "veteran_one_parent": 10530.78,
          "veteran_two_parents": 10693.60,
          "veteran_one_child": 10504.57,
          "veteran_spouse_one_child": 10720.21,
          "veteran_spouse_one_parent_one_child": 10883.03,
          "veteran_spouse_two_parents_one_child": 11045.85,
          "veteran_one_parent_one_child": 10667.39,
          "veteran_two_parents_one_child": 10830.21
        },
        "addons": {
          "additional_child_under_18": 100.34,
          "additional_child_over_18_school": 324.12,
          "spouse_aid_and_attendance": 185.21
        }
      },
      "smc_s": {
        "base": {
          "veteran_alone": 4055.50,
          "veteran_spouse": 4258.48,
          "veteran_spouse_one_parent": 4421.30,
          "veteran_spouse_two_parents": 4584.12,
          "veteran_one_parent": 4218.32,
          "veteran_two_parents": 4381.14,
          "veteran_one_child": 4192.11,
          "veteran_spouse_one_child": 4407.75,
          "veteran_spouse_one_parent_one_child": 4570.57,
          "veteran_spouse_two_parents_one_child": 4733.39,
          "veteran_one_parent_one_child": 4354.93,
          "veteran_two_parents_one_child": 4517.75
        },
        "addons": {
          "additional_child_under_18": 100.34,
          "additional_child_over_18_school": 324.12,
          "spouse_aid_and_attendance": 185.21
        }
      }
    }
  },
  {
    "cola_year": "2022",
    "effective_date": "2021-12-01",
    "rates": {
      "10%": {
        "flat": 152.64
      },
      "20%": {
        "flat": 301.74
      },
      "30%": {
        "base": {
          "veteran_alone": 467.39,
          "veteran_spouse": 522.39,
          "veteran_spouse_one_parent": 568.39,
          "veteran_spouse_two_parents": 614.39,
          "veteran_one_parent": 513.39,
          "veteran_two_parents": 559.39,
          "veteran_one_child": 504.39,
          "veteran_spouse_one_child": 563.39,
          "veteran_spouse_one_parent_one_child": 609.39,
          "veteran_spouse_two_parents_one_child": 655.39,
          "veteran_one_parent_one_child": 550.39,
          "veteran_two_parents_one_child": 596.39
        },
        "addons": {
          "additional_child_under_18": 27.00,
          "additional_child_over_18_school": 89.00,
          "spouse_aid_and_attendance": 51.00
        }
      },
      "40%": {
        "base": {
          "veteran_alone": 673.28,
          "veteran_spouse": 747.28,
          "veteran_spouse_one_parent": 807.28,
          "veteran_spouse_two_parents": 867.28,
          "veteran_one_parent": 733.28,
          "veteran_two_parents": 793.28,
          "veteran_one_child": 722.28,
          "veteran_spouse_one_child": 802.28,
          "veteran_spouse_one_parent_one_child": 862.28,
          "veteran_spouse_two_parents_one_child": 922.28,
          "veteran_one_parent_one_child": 782.28,
          "veteran_two_parents_one_child": 842.28
        },
        "addons": {
          "additional_child_under_18": 36.00,
          "additional_child_over_18_school": 119.00,
          "spouse_aid_and_attendance": 68.00
        }
      },
      "50%": {
        "base": {
          "veteran_alone": 958.44,
          "veteran_spouse": 1051.44,
          "veteran_spouse_one_parent": 1127.44,
          "veteran_spouse_two_parents": 1203.44,
          "veteran_one_parent": 1034.44,
          "veteran_two_parents": 1110.44,
          "veteran_one_child": 1020.44,
          "veteran_spouse_one_child": 1119.44,
          "veteran_spouse_one_parent_one_child": 1195.44,
          "veteran_spouse_two_parents_one_child": 1271.44,
          "veteran_one_parent_one_child": 1096.44,
          "veteran_two_parents_one_child": 1172.44
        },
        "addons": {
          "additional_child_under_18": 46.00,
          "additional_child_over_18_school": 149.00,
          "spouse_aid_and_attendance": 85.00
        }
      },
      "60%": {
        "base": {
          "veteran_alone": 1213.39,
          "veteran_spouse": 1326.39,
          "veteran_spouse_one_parent": 1416.39,
          "veteran_spouse_two_parents": 1506.39,
          "veteran_one_parent": 1303.39,
          "veteran_two_parents": 1393.39,
          "veteran_one_child": 1288.39,
          "veteran_spouse_one_child": 1407.39,
          "veteran_spouse_one_parent_one_child": 1497.39,
          "veteran_spouse_two_parents_one_child": 1587.39,
          "veteran_one_parent_one_child": 1378.39,
          "veteran_two_parents_one_child": 1468.39
        },
        "addons": {
          "additional_child_under_18": 55.00,
          "additional_child_over_18_school": 178.00,
          "spouse_aid_and_attendance": 102.00
        }
      },
      "70%": {
        "base": {
          "veteran_alone": 1529.75,
          "veteran_spouse": 1659.75,
          "veteran_spouse_one_parent": 1763.75,
          "veteran_spouse_two_parents": 1867.75,
          "veteran_one_parent": 1633.75,
          "veteran_two_parents": 1737.75,
          "veteran_one_child": 1616.75,
          "veteran_spouse_one_child": 1753.75,
          "veteran_spouse_one_parent_one_child": 1857.75,
          "veteran_spouse_two_parents_one_child": 1961.75,
          "veteran_one_parent_one_child": 1720.75,
          "veteran_two_parents_one_child": 1824.75
        },
        "addons": {
          "additional_child_under_18": 64.00,
          "additional_child_over_18_school": 208.00,
          "spouse_aid_and_attendance": 119.00
        }
      },
      "80%": {
        "base": {
          "veteran_alone": 1778.43,
          "veteran_spouse": 1926.43,
          "veteran_spouse_one_parent": 2047.43,
          "veteran_spouse_two_parents": 2168.43,
          "veteran_one_parent": 1899.43,
          "veteran_two_parents": 2020.43,
          "veteran_one_child": 1877.43,
          "veteran_spouse_one_child": 2032.43,
          "veteran_spouse_one_parent_one_child": 2153.43,
          "veteran_spouse_two_parents_one_child": 2274.43,
          "veteran_one_parent_one_child": 1998.43,
          "veteran_two_parents_one_child": 2119.43
        },
        "addons": {
          "additional_child_under_18": 73.00,
          "additional_child_over_18_school": 238.00,
          "spouse_aid_and_attendance": 136.00
        }
      },
      "90%": {
        "base": {
          "veteran_alone": 1998.71,
          "veteran_spouse": 2163.71,
          "veteran_spouse_one_parent": 2297.71,
          "veteran_spouse_two_parents": 2431.71,
          "veteran_one_parent": 2132.71,
          "veteran_two_parents": 2266.71,
          "veteran_one_child": 2110.71,
          "veteran_spouse_one_child": 2283.71,
          "veteran_spouse_one_parent_one_child": 2417.71,
          "veteran_spouse_two_parents_one_child": 2551.71,
          "veteran_one_parent_one_child": 2244.71,
          "veteran_two_parents_one_child": 2378.71
        },
        "addons": {
          "additional_child_under_18": 83.00,
          "additional_child_over_18_school": 268.00,
          "spouse_aid_and_attendance": 153.00
        }
      },
      "100%": {
        "base": {
          "veteran_alone": 3332.06,
          "veteran_spouse": 3517.84,
          "veteran_spouse_one_parent": 3670.21,
          "veteran_spouse_two_parents": 3822.58,
          "veteran_one_parent": 3484.43,
          "veteran_two_parents": 3636.80,
          "veteran_one_child": 3457.80,
          "veteran_spouse_one_child": 3656.13,
          "veteran_spouse_one_parent_one_child": 3808.50,
          "veteran_spouse_two_parents_one_child": 3960.87,
          "veteran_one_parent_one_child": 3610.17,
          "veteran_two_parents_one_child": 3762.54
        },
        "addons": {
          "additional_child_under_18": 92.31,
          "additional_child_over_18_school": 298.18,
          "spouse_aid_and_attendance": 170.38
        }
      },
      "smc_k": {
        "amount": 118.33
      },
      "smc_l": {
        "base": {
          "veteran_alone": 4146.73,
          "veteran_spouse": 4332.51,
          "veteran_spouse_one_parent": 4484.88,
          "veteran_spouse_two_parents": 4637.25,
          "veteran_one_parent": 4299.10,
          "veteran_two_parents": 4451.47,
          "veteran_one_child": 4272.47,
          "veteran_spouse_one_child": 4470.80,
          "veteran_spouse_one_parent_one_child": 4623.17,
          "veteran_spouse_two_parents_one_child": 4775.54,
          "veteran_one_parent_one_child": 4424.84,
          "veteran_two_parents_one_child": 4577.21
        },
        "addons": {
          "additional_child_under_18": 92.31,
          "additional_child_over_18_school": 298.18,
          "spouse_aid_and_attendance": 170.38
        }
      },
      "smc_l_half": {
        "base": {
          "veteran_alone": 4359.52,
          "veteran_spouse": 4545.30,
          "veteran_spouse_one_parent": 4697.67,
          "veteran_spouse_two_parents": 4850.04,
          "veteran_one_parent": 4511.89,
          "veteran_two_parents": 4664.26,
          "veteran_one_child": 4485.26,
          "veteran_spouse_one_child": 4683.59,
          "veteran_spouse_one_parent_one_child": 4835.96,
          "veteran_spouse_two_parents_one_child": 4988.33,
          "veteran_one_parent_one_child": 4637.63,
          "veteran_two_parents_one_child": 4789.99
        },
        "addons": {
          "additional_child_under_18": 92.31,
          "additional_child_over_18_school": 298.18,
          "spouse_aid_and_attendance": 170.38
        }
      },
      "smc_m": {
        "base": {
          "veteran_alone": 4572.84,
          "veteran_spouse": 4758.62,
          "veteran_spouse_one_parent": 4910.99,
          "veteran_spouse_two_parents": 5063.36,
          "veteran_one_parent": 4725.21,
          "veteran_two_parents": 4877.58,
          "veteran_one_child": 4698.58,
          "veteran_spouse_one_child": 4896.91,
          "veteran_spouse_one_parent_one_child": 5049.28,
          "veteran_spouse_two_parents_one_child": 5201.65,
          "veteran_one_parent_one_child": 4850.95,
          "veteran_two_parents_one_child": 5003.32
        },
        "addons": {
          "additional_child_under_18": 92.31,
          "additional_child_over_18_school": 298.18,
          "spouse_aid_and_attendance": 170.38
        }
      },
      "smc_m_half": {
        "base": {
          "veteran_alone": 4887.94,
          "veteran_spouse": 5073.72,
          "veteran_spouse_one_parent": 5226.09,
          "veteran_spouse_two_parents": 5378.46,
          "veteran_one_parent": 5040.31,
          "veteran_two_parents": 5192.68,
          "veteran_one_child": 5013.68,
          "veteran_spouse_one_child": 5212.01,
          "veteran_spouse_one_parent_one_child": 5364.38,
          "veteran_spouse_two_parents_one_child": 5516.75,
          "veteran_one_parent_one_child": 5166.05,
          "veteran_two_parents_one_child": 5318.42
        },
        "addons": {
          "additional_child_under_18": 92.31,
          "additional_child_over_18_school": 298.18,
          "spouse_aid_and_attendance": 170.38
        }
      },
      "smc_n": {
        "base": {
          "veteran_alone": 5203.36,
          "veteran_spouse": 5389.14,
          "veteran_spouse_one_parent": 5541.51,
          "veteran_spouse_two_parents": 5693.88,
          "veteran_one_parent": 5355.73,
          "veteran_two_parents": 5508.10,
          "veteran_one_child": 5329.10,
          "veteran_spouse_one_child": 5527.43,
          "veteran_spouse_one_parent_one_child": 5679.80,
          "veteran_spouse_two_parents_one_child": 5832.17,
          "veteran_one_parent_one_child": 5481.47,
          "veteran_two_parents_one_child": 5633.84
        },
        "addons": {
          "additional_child_under_18": 92.31,
          "additional_child_over_18_school": 298.18,
          "spouse_aid_and_attendance": 170.38
        }
      },
      "smc_n_half": {
        "base": {
          "veteran_alone": 5508.61,
          "veteran_spouse": 5694.39,
          "veteran_spouse_one_parent": 5846.76,
          "veteran_spouse_two_parents": 5999.13,
          "veteran_one_parent": 5660.98,
          "veteran_two_parents": 5813.35,
          "veteran_one_child": 5634.35,
          "veteran_spouse_one_child": 5832.68,
          "veteran_spouse_one_parent_one_child": 5985.05,
          "veteran_spouse_two_parents_one_child": 6137.42,
          "veteran_one_parent_one_child": 5786.72,
          "veteran_two_parents_one_child": 5939.09
        },
        "addons": {
          "additional_child_under_18": 92.31,
          "additional_child_over_18_school": 298.18,
          "spouse_aid_and_attendance": 170.38
        }
      },
      "smc_op": {
        "base": {
          "veteran_alone": 5814.33,
          "veteran_spouse": 6000.11,
          "veteran_spouse_one_parent": 6152.48,
          "veteran_spouse_two_parents": 6304.85,
          "veteran_one_parent": 5966.70,
          "veteran_two_parents": 6119.07,
          "veteran_one_child": 5940.07,
          "veteran_spouse_one_child": 6138.40,
          "veteran_spouse_one_parent_one_child": 6290.77,
          "veteran_spouse_two_parents_one_child": 6443.14,
          "veteran_one_parent_one_child": 6092.44,
          "veteran_two_parents_one_child": 6244.81
        },
        "addons": {
          "additional_child_under_18": 92.31,
          "additional_child_over_18_school": 298.18,
          "spouse_aid_and_attendance": 170.38
        }
      },
      "smc_r1": {
        "base": {
          "veteran_alone": 8316.13,
          "veteran_spouse": 8501.91,
          "veteran_spouse_one_parent": 8654.28,
          "veteran_spouse_two_parents": 8806.65,
          "veteran_one_parent": 8468.50,
          "veteran_two_parents": 8620.87,
          "veteran_one_child": 8441.87,
          "veteran_spouse_one_child": 8640.20,
          "veteran_spouse_one_parent_one_child": 8792.57,
          "veteran_spouse_two_parents_one_child": 8944.94,
          "veteran_one_parent_one_child": 8594.24,
          "veteran_two_parents_one_child": 8746.61
        },
        "addons": {
          "additional_child_under_18": 92.31,
          "additional_child_over_18_school": 298.18,
          "spouse_aid_and_attendance": 170.38
        }
      },
      "smc_r2_t": {
        "base": {
          "veteran_alone": 9539.86,
          "veteran_spouse": 9725.64,
          "veteran_spouse_one_parent": 9878.01,
          "veteran_spouse_two_parents": 10030.38,
          "veteran_one_parent": 9692.23,
          "veteran_two_parents": 9844.60,
          "veteran_one_child": 9665.60,
          "veteran_spouse_one_child": 9863.93,
          "veteran_spouse_one_parent_one_child": 10016.30,
          "veteran_spouse_two_parents_one_child": 10168.67,
          "veteran_one_parent_one_child": 9817.97,
          "veteran_two_parents_one_child": 9970.34
        },
        "addons": {
          "additional_child_under_18": 92.31,
          "additional_child_over_18_school": 298.18,
          "spouse_aid_and_attendance": 170.38
        }
      },
      "smc_s": {
        "base": {
          "veteran_alone": 3730.86,
          "veteran_spouse": 3916.64,
          "veteran_spouse_one_parent": 4069.01,
          "veteran_spouse_two_parents": 4221.38,
          "veteran_one_parent": 3883.23,
          "veteran_two_parents": 4035.60,
          "veteran_one_child": 3856.60,
          "veteran_spouse_one_child": 4054.93,
          "veteran_spouse_one_parent_one_child": 4207.30,
          "veteran_spouse_two_parents_one_child": 4359.67,
          "veteran_one_parent_one_child": 4008.97,
          "veteran_two_parents_one_child": 4161.34
        },
        "addons": {
          "additional_child_under_18": 92.31,
          "additional_child_over_18_school": 298.18,
          "spouse_aid_and_attendance": 170.38
        }
      }
    }
  }, 
  {
    "cola_year": "2021",
    "effective_date": "2020-12-01",
    "rates": {
      "10%": {
        "flat": 144.14
      },
      "20%": {
        "flat": 284.93
      },
      "30%": {
        "base": {
          "veteran_alone": 441.35,
          "veteran_spouse": 493.35,
          "veteran_spouse_one_parent": 535.35,
          "veteran_spouse_two_parents": 577.35,
          "veteran_one_parent": 483.35,
          "veteran_two_parents": 525.35,
          "veteran_one_child": 476.35,
          "veteran_spouse_one_child": 532.35,
          "veteran_spouse_one_parent_one_child": 574.35,
          "veteran_spouse_two_parents_one_child": 616.35,
          "veteran_one_parent_one_child": 518.35,
          "veteran_two_parents_one_child": 560.35
        },
        "addons": {
          "additional_child_under_18": 26.00,
          "additional_child_over_18_school": 84.00,
          "spouse_aid_and_attendance": 48.00
        }
      },
      "40%": {
        "base": {
          "veteran_alone": 635.77,
          "veteran_spouse": 706.77,
          "veteran_spouse_one_parent": 761.77,
          "veteran_spouse_two_parents": 816.77,
          "veteran_one_parent": 690.77,
          "veteran_two_parents": 745.77,
          "veteran_one_child": 681.77,
          "veteran_spouse_one_child": 756.77,
          "veteran_spouse_one_parent_one_child": 811.77,
          "veteran_spouse_two_parents_one_child": 866.77,
          "veteran_one_parent_one_child": 736.77,
          "veteran_two_parents_one_child": 791.77
        },
        "addons": {
          "additional_child_under_18": 34.00,
          "additional_child_over_18_school": 112.00,
          "spouse_aid_and_attendance": 64.00
        }
      },
      "50%": {
        "base": {
          "veteran_alone": 905.04,
          "veteran_spouse": 992.04,
          "veteran_spouse_one_parent": 1061.04,
          "veteran_spouse_two_parents": 1130.04,
          "veteran_one_parent": 974.04,
          "veteran_two_parents": 1043.04,
          "veteran_one_child": 963.04,
          "veteran_spouse_one_child": 1056.04,
          "veteran_spouse_one_parent_one_child": 1125.04,
          "veteran_spouse_two_parents_one_child": 1194.04,
          "veteran_one_parent_one_child": 1032.04,
          "veteran_two_parents_one_child": 1101.04
        },
        "addons": {
          "additional_child_under_18": 43.00,
          "additional_child_over_18_school": 141.00,
          "spouse_aid_and_attendance": 81.00
        }
      },
      "60%": {
        "base": {
          "veteran_alone": 1146.39,
          "veteran_spouse": 1251.39,
          "veteran_spouse_one_parent": 1335.39,
          "veteran_spouse_two_parents": 1419.39,
          "veteran_one_parent": 1230.39,
          "veteran_two_parents": 1314.39,
          "veteran_one_child": 1216.39,
          "veteran_spouse_one_child": 1328.39,
          "veteran_spouse_one_parent_one_child": 1412.39,
          "veteran_spouse_two_parents_one_child": 1496.39,
          "veteran_one_parent_one_child": 1300.39,
          "veteran_two_parents_one_child": 1384.39
        },
        "addons": {
          "additional_child_under_18": 52.00,
          "additional_child_over_18_school": 168.00,
          "spouse_aid_and_attendance": 96.00
        }
      },
      "70%": {
        "base": {
          "veteran_alone": 1444.71,
          "veteran_spouse": 1566.71,
          "veteran_spouse_one_parent": 1665.71,
          "veteran_spouse_two_parents": 1764.71,
          "veteran_one_parent": 1543.71,
          "veteran_two_parents": 1642.71,
          "veteran_one_child": 1524.71,
          "veteran_spouse_one_child": 1655.71,
          "veteran_spouse_one_parent_one_child": 1754.71,
          "veteran_spouse_two_parents_one_child": 1853.71,
          "veteran_one_parent_one_child": 1623.71,
          "veteran_two_parents_one_child": 1722.71
        },
        "addons": {
          "additional_child_under_18": 61.00,
          "additional_child_over_18_school": 197.00,
          "spouse_aid_and_attendance": 113.00
        }
      },
      "80%": {
        "base": {
          "veteran_alone": 1679.35,
          "veteran_spouse": 1819.35,
          "veteran_spouse_one_parent": 1933.35,
          "veteran_spouse_two_parents": 2047.35,
          "veteran_one_parent": 1793.35,
          "veteran_two_parents": 1907.35,
          "veteran_one_child": 1772.35,
          "veteran_spouse_one_child": 1919.35,
          "veteran_spouse_one_parent_one_child": 2033.35,
          "veteran_spouse_two_parents_one_child": 2147.35,
          "veteran_one_parent_one_child": 1886.35,
          "veteran_two_parents_one_child": 2000.35
        },
        "addons": {
          "additional_child_under_18": 69.00,
          "additional_child_over_18_school": 225.00,
          "spouse_aid_and_attendance": 129.00
        }
      },
      "90%": {
        "base": {
          "veteran_alone": 1887.18,
          "veteran_spouse": 2045.18,
          "veteran_spouse_one_parent": 2174.18,
          "veteran_spouse_two_parents": 2303.18,
          "veteran_one_parent": 2016.18,
          "veteran_two_parents": 2145.18,
          "veteran_one_child": 1992.18,
          "veteran_spouse_one_child": 2159.18,
          "veteran_spouse_one_parent_one_child": 2288.18,
          "veteran_spouse_two_parents_one_child": 2417.18,
          "veteran_one_parent_one_child": 2121.18,
          "veteran_two_parents_one_child": 2250.18
        },
        "addons": {
          "additional_child_under_18": 78.00,
          "additional_child_over_18_school": 253.00,
          "spouse_aid_and_attendance": 145.00
        }
      },
      "100%": {
        "base": {
          "veteran_alone": 3146.42,
          "veteran_spouse": 3321.85,
          "veteran_spouse_one_parent": 3464.93,
          "veteran_spouse_two_parents": 3608.01,
          "veteran_one_parent": 3289.50,
          "veteran_two_parents": 3432.58,
          "veteran_one_child": 3266.13,
          "veteran_spouse_one_child": 3453.28,
          "veteran_spouse_one_parent_one_child": 3596.36,
          "veteran_spouse_two_parents_one_child": 3739.44,
          "veteran_one_parent_one_child": 3409.21,
          "veteran_two_parents_one_child": 3552.29
        },
        "addons": {
          "additional_child_under_18": 87.17,
          "additional_child_over_18_school": 281.57,
          "spouse_aid_and_attendance": 160.89
        }
      },
      "smc_k": {
        "amount": 111.74
      },
      "smc_l": {
        "base": {
          "veteran_alone": 3913.49,
          "veteran_spouse": 4088.92,
          "veteran_spouse_one_parent": 4232.00,
          "veteran_spouse_two_parents": 4375.08,
          "veteran_one_parent": 4056.57,
          "veteran_two_parents": 4199.65,
          "veteran_one_child": 4033.20,
          "veteran_spouse_one_child": 4220.35,
          "veteran_spouse_one_parent_one_child": 4363.43,
          "veteran_spouse_two_parents_one_child": 4506.51,
          "veteran_one_parent_one_child": 4176.28,
          "veteran_two_parents_one_child": 4319.36
        },
        "addons": {
          "additional_child_under_18": 87.17,
          "additional_child_over_18_school": 281.57,
          "spouse_aid_and_attendance": 160.89
        }
      },
      "smc_l_half": {
        "base": {
          "veteran_alone": 4116.67,
          "veteran_spouse": 4292.10,
          "veteran_spouse_one_parent": 4435.18,
          "veteran_spouse_two_parents": 4578.26,
          "veteran_one_parent": 4259.75,
          "veteran_two_parents": 4402.83,
          "veteran_one_child": 4236.38,
          "veteran_spouse_one_child": 4423.53,
          "veteran_spouse_one_parent_one_child": 4566.61,
          "veteran_spouse_two_parents_one_child": 4709.69,
          "veteran_one_parent_one_child": 4379.46,
          "veteran_two_parents_one_child": 4522.54
        },
        "addons": {
          "additional_child_under_18": 87.17,
          "additional_child_over_18_school": 281.57,
          "spouse_aid_and_attendance": 160.89
        }
      },
      "smc_m": {
        "base": {
          "veteran_alone": 4320.76,
          "veteran_spouse": 4496.19,
          "veteran_spouse_one_parent": 4639.27,
          "veteran_spouse_two_parents": 4782.35,
          "veteran_one_parent": 4463.84,
          "veteran_two_parents": 4606.92,
          "veteran_one_child": 4440.47,
          "veteran_spouse_one_child": 4627.62,
          "veteran_spouse_one_parent_one_child": 4770.70,
          "veteran_spouse_two_parents_one_child": 4913.78,
          "veteran_one_parent_one_child": 4583.55,
          "veteran_two_parents_one_child": 4726.63
        },
        "addons": {
          "additional_child_under_18": 87.17,
          "additional_child_over_18_school": 281.57,
          "spouse_aid_and_attendance": 160.89
        }
      },
      "smc_m_half": {
        "base": {
          "veteran_alone": 4616.29,
          "veteran_spouse": 4791.72,
          "veteran_spouse_one_parent": 4934.80,
          "veteran_spouse_two_parents": 5077.88,
          "veteran_one_parent": 4759.37,
          "veteran_two_parents": 4902.45,
          "veteran_one_child": 4736.00,
          "veteran_spouse_one_child": 4923.15,
          "veteran_spouse_one_parent_one_child": 5066.23,
          "veteran_spouse_two_parents_one_child": 5209.31,
          "veteran_one_parent_one_child": 4879.08,
          "veteran_two_parents_one_child": 5022.16
        },
        "addons": {
          "additional_child_under_18": 87.17,
          "additional_child_over_18_school": 281.57,
          "spouse_aid_and_attendance": 160.89
        }
      },
      "smc_n": {
        "base": {
          "veteran_alone": 4912.87,
          "veteran_spouse": 5088.30,
          "veteran_spouse_one_parent": 5231.38,
          "veteran_spouse_two_parents": 5374.46,
          "veteran_one_parent": 5055.95,
          "veteran_two_parents": 5199.03,
          "veteran_one_child": 5032.58,
          "veteran_spouse_one_child": 5219.73,
          "veteran_spouse_one_parent_one_child": 5362.81,
          "veteran_spouse_two_parents_one_child": 5505.89,
          "veteran_one_parent_one_child": 5175.66,
          "veteran_two_parents_one_child": 5318.74
        },
        "addons": {
          "additional_child_under_18": 87.17,
          "additional_child_over_18_school": 281.57,
          "spouse_aid_and_attendance": 160.89
        }
      },
      "smc_n_half": {
        "base": {
          "veteran_alone": 5200.75,
          "veteran_spouse": 5376.18,
          "veteran_spouse_one_parent": 5519.26,
          "veteran_spouse_two_parents": 5662.34,
          "veteran_one_parent": 5343.83,
          "veteran_two_parents": 5486.91,
          "veteran_one_child": 5320.46,
          "veteran_spouse_one_child": 5507.61,
          "veteran_spouse_one_parent_one_child": 5650.69,
          "veteran_spouse_two_parents_one_child": 5793.77,
          "veteran_one_parent_one_child": 5463.54,
          "veteran_two_parents_one_child": 5606.62
        },
        "addons": {
          "additional_child_under_18": 87.17,
          "additional_child_over_18_school": 281.57,
          "spouse_aid_and_attendance": 160.89
        }
      },
      "smc_op": {
        "base": {
          "veteran_alone": 5489.44,
          "veteran_spouse": 5664.87,
          "veteran_spouse_one_parent": 5807.95,
          "veteran_spouse_two_parents": 5951.03,
          "veteran_one_parent": 5632.52,
          "veteran_two_parents": 5775.60,
          "veteran_one_child": 5609.15,
          "veteran_spouse_one_child": 5796.30,
          "veteran_spouse_one_parent_one_child": 5939.38,
          "veteran_spouse_two_parents_one_child": 6082.46,
          "veteran_one_parent_one_child": 5752.23,
          "veteran_two_parents_one_child": 5895.31
        },
        "addons": {
          "additional_child_under_18": 87.17,
          "additional_child_over_18_school": 281.57,
          "spouse_aid_and_attendance": 160.89
        }
      },
      "smc_r1": {
        "base": {
          "veteran_alone": 7846.24,
          "veteran_spouse": 8021.67,
          "veteran_spouse_one_parent": 8164.75,
          "veteran_spouse_two_parents": 8307.83,
          "veteran_one_parent": 7989.32,
          "veteran_two_parents": 8132.40,
          "veteran_one_child": 7965.95,
          "veteran_spouse_one_child": 8153.10,
          "veteran_spouse_one_parent_one_child": 8296.18,
          "veteran_spouse_two_parents_one_child": 8439.26,
          "veteran_one_parent_one_child": 8109.03,
          "veteran_two_parents_one_child": 8252.11
        },
        "addons": {
          "additional_child_under_18": 87.17,
          "additional_child_over_18_school": 281.57,
          "spouse_aid_and_attendance": 160.89
        }
      },
      "smc_r2_t": {
        "base": {
          "veteran_alone": 9002.57,
          "veteran_spouse": 9178.00,
          "veteran_spouse_one_parent": 9321.08,
          "veteran_spouse_two_parents": 9464.16,
          "veteran_one_parent": 9145.65,
          "veteran_two_parents": 9288.73,
          "veteran_one_child": 9122.28,
          "veteran_spouse_one_child": 9309.43,
          "veteran_spouse_one_parent_one_child": 9452.51,
          "veteran_spouse_two_parents_one_child": 9595.59,
          "veteran_one_parent_one_child": 9265.36,
          "veteran_two_parents_one_child": 9408.44
        },
        "addons": {
          "additional_child_under_18": 87.17,
          "additional_child_over_18_school": 281.57,
          "spouse_aid_and_attendance": 160.89
        }
      },
      "smc_s": {
        "base": {
          "veteran_alone": 3521.27,
          "veteran_spouse": 3696.70,
          "veteran_spouse_one_parent": 3839.78,
          "veteran_spouse_two_parents": 3982.86,
          "veteran_one_parent": 3664.35,
          "veteran_two_parents": 3807.43,
          "veteran_one_child": 3640.98,
          "veteran_spouse_one_child": 3828.13,
          "veteran_spouse_one_parent_one_child": 3971.21,
          "veteran_spouse_two_parents_one_child": 4114.29,
          "veteran_one_parent_one_child": 3784.06,
          "veteran_two_parents_one_child": 3927.14
        },
        "addons": {
          "additional_child_under_18": 87.17,
          "additional_child_over_18_school": 281.57,
          "spouse_aid_and_attendance": 160.89
        }
      }
    }
  },
  {
    "cola_year": "2020",
    "effective_date": "2019-12-01",
    "rates": {
      "10%": {
        "flat": 142.29
      },
      "20%": {
        "flat": 281.27
      },
      "30%": {
        "base": {
          "veteran_alone": 435.69,
          "veteran_spouse": 487.69,
          "veteran_spouse_one_parent": 528.69,
          "veteran_spouse_two_parents": 569.69,
          "veteran_one_parent": 476.69,
          "veteran_two_parents": 517.69,
          "veteran_one_child": 470.69,
          "veteran_spouse_one_child": 525.69,
          "veteran_spouse_one_parent_one_child": 566.69,
          "veteran_spouse_two_parents_one_child": 607.69,
          "veteran_one_parent_one_child": 511.69,
          "veteran_two_parents_one_child": 552.69
        },
        "addons": {
          "additional_child_under_18": 26.00,
          "additional_child_over_18_school": 83.00,
          "spouse_aid_and_attendance": 48.00
        }
      },
      "40%": {
        "base": {
          "veteran_alone": 627.61,
          "veteran_spouse": 697.61,
          "veteran_spouse_one_parent": 751.61,
          "veteran_spouse_two_parents": 805.61,
          "veteran_one_parent": 681.61,
          "veteran_two_parents": 735.61,
          "veteran_one_child": 672.61,
          "veteran_spouse_one_child": 746.61,
          "veteran_spouse_one_parent_one_child": 800.61,
          "veteran_spouse_two_parents_one_child": 854.61,
          "veteran_one_parent_one_child": 726.61,
          "veteran_two_parents_one_child": 780.61
        },
        "addons": {
          "additional_child_under_18": 34.00,
          "additional_child_over_18_school": 110.00,
          "spouse_aid_and_attendance": 64.00
        }
      },
      "50%": {
        "base": {
          "veteran_alone": 893.43,
          "veteran_spouse": 979.43,
          "veteran_spouse_one_parent": 1047.43,
          "veteran_spouse_two_parents": 1115.43,
          "veteran_one_parent": 961.43,
          "veteran_two_parents": 1029.43,
          "veteran_one_child": 950.43,
          "veteran_spouse_one_child": 1042.43,
          "veteran_spouse_one_parent_one_child": 1110.43,
          "veteran_spouse_two_parents_one_child": 1178.43,
          "veteran_one_parent_one_child": 1018.43,
          "veteran_two_parents_one_child": 1086.43
        },
        "addons": {
          "additional_child_under_18": 43.00,
          "additional_child_over_18_school": 139.00,
          "spouse_aid_and_attendance": 80.00
        }
      },
      "60%": {
        "base": {
          "veteran_alone": 1131.68,
          "veteran_spouse": 1234.68,
          "veteran_spouse_one_parent": 1317.68,
          "veteran_spouse_two_parents": 1400.68,
          "veteran_one_parent": 1214.68,
          "veteran_two_parents": 1297.68,
          "veteran_one_child": 1200.68,
          "veteran_spouse_one_child": 1309.68,
          "veteran_spouse_one_parent_one_child": 1392.68,
          "veteran_spouse_two_parents_one_child": 1475.68,
          "veteran_one_parent_one_child": 1283.68,
          "veteran_two_parents_one_child": 1366.68
        },
        "addons": {
          "additional_child_under_18": 51.00,
          "additional_child_over_18_school": 166.00,
          "spouse_aid_and_attendance": 95.00
        }
      },
      "70%": {
        "base": {
          "veteran_alone": 1426.17,
          "veteran_spouse": 1546.17,
          "veteran_spouse_one_parent": 1643.17,
          "veteran_spouse_two_parents": 1740.17,
          "veteran_one_parent": 1523.17,
          "veteran_two_parents": 1620.17,
          "veteran_one_child": 1504.17,
          "veteran_spouse_one_child": 1632.17,
          "veteran_spouse_one_parent_one_child": 1729.17,
          "veteran_spouse_two_parents_one_child": 1826.17,
          "veteran_one_parent_one_child": 1601.17,
          "veteran_two_parents_one_child": 1698.17
        },
        "addons": {
          "additional_child_under_18": 60.00,
          "additional_child_over_18_school": 194.00,
          "spouse_aid_and_attendance": 111.00
        }
      },
      "80%": {
        "base": {
          "veteran_alone": 1657.80,
          "veteran_spouse": 1795.80,
          "veteran_spouse_one_parent": 1907.80,
          "veteran_spouse_two_parents": 2019.80,
          "veteran_one_parent": 1769.80,
          "veteran_two_parents": 1881.80,
          "veteran_one_child": 1748.80,
          "veteran_spouse_one_child": 1894.80,
          "veteran_spouse_one_parent_one_child": 2006.80,
          "veteran_spouse_two_parents_one_child": 2118.80,
          "veteran_one_parent_one_child": 1860.80,
          "veteran_two_parents_one_child": 1972.80
        },
        "addons": {
          "additional_child_under_18": 68.00,
          "additional_child_over_18_school": 222.00,
          "spouse_aid_and_attendance": 127.00
        }
      },
      "90%": {
        "base": {
          "veteran_alone": 1862.96,
          "veteran_spouse": 2019.96,
          "veteran_spouse_one_parent": 2146.96,
          "veteran_spouse_two_parents": 2273.96,
          "veteran_one_parent": 1989.96,
          "veteran_two_parents": 2116.96,
          "veteran_one_child": 1966.96,
          "veteran_spouse_one_child": 2129.96,
          "veteran_spouse_one_parent_one_child": 2256.96,
          "veteran_spouse_two_parents_one_child": 2383.96,
          "veteran_one_parent_one_child": 2093.96,
          "veteran_two_parents_one_child": 2220.96
        },
        "addons": {
          "additional_child_under_18": 77.00,
          "additional_child_over_18_school": 250.00,
          "spouse_aid_and_attendance": 143.00
        }
      },
      "100%": {
        "base": {
          "veteran_alone": 3106.04,
          "veteran_spouse": 3279.22,
          "veteran_spouse_one_parent": 3419.09,
          "veteran_spouse_two_parents": 3558.96,
          "veteran_one_parent": 3245.91,
          "veteran_two_parents": 3385.78,
          "veteran_one_child": 3224.03,
          "veteran_spouse_one_child": 3408.34,
          "veteran_spouse_one_parent_one_child": 3548.21,
          "veteran_spouse_two_parents_one_child": 3688.08,
          "veteran_one_parent_one_child": 3363.90,
          "veteran_two_parents_one_child": 3503.77
        },
        "addons": {
          "additional_child_under_18": 86.05,
          "additional_child_over_18_school": 277.96,
          "spouse_aid_and_attendance": 158.82
        }
      },
      "smc_k": {
        "amount": 110.31
      },
      "smc_l": {
        "base": {
          "veteran_alone": 3861.91,
          "veteran_spouse": 4035.09,
          "veteran_spouse_one_parent": 4174.96,
          "veteran_spouse_two_parents": 4314.83,
          "veteran_one_parent": 4001.78,
          "veteran_two_parents": 4141.65,
          "veteran_one_child": 3979.90,
          "veteran_spouse_one_child": 4164.21,
          "veteran_spouse_one_parent_one_child": 4304.08,
          "veteran_spouse_two_parents_one_child": 4443.95,
          "veteran_one_parent_one_child": 4119.77,
          "veteran_two_parents_one_child": 4259.64
        },
        "addons": {
          "additional_child_under_18": 86.05,
          "additional_child_over_18_school": 277.96,
          "spouse_aid_and_attendance": 158.82
        }
      },
      "smc_l_half": {
        "base": {
          "veteran_alone": 4062.51,
          "veteran_spouse": 4235.69,
          "veteran_spouse_one_parent": 4375.56,
          "veteran_spouse_two_parents": 4515.43,
          "veteran_one_parent": 4202.38,
          "veteran_two_parents": 4342.25,
          "veteran_one_child": 4180.50,
          "veteran_spouse_one_child": 4364.81,
          "veteran_spouse_one_parent_one_child": 4504.68,
          "veteran_spouse_two_parents_one_child": 4644.55,
          "veteran_one_parent_one_child": 4320.37,
          "veteran_two_parents_one_child": 4460.24
        },
        "addons": {
          "additional_child_under_18": 86.05,
          "additional_child_over_18_school": 277.96,
          "spouse_aid_and_attendance": 158.82
        }
      },
      "smc_m": {
        "base": {
          "veteran_alone": 4264.04,
          "veteran_spouse": 4437.22,
          "veteran_spouse_one_parent": 4577.09,
          "veteran_spouse_two_parents": 4716.96,
          "veteran_one_parent": 4403.91,
          "veteran_two_parents": 4543.78,
          "veteran_one_child": 4382.03,
          "veteran_spouse_one_child": 4566.34,
          "veteran_spouse_one_parent_one_child": 4706.21,
          "veteran_spouse_two_parents_one_child": 4846.08,
          "veteran_one_parent_one_child": 4521.90,
          "veteran_two_parents_one_child": 4661.77
        },
        "addons": {
          "additional_child_under_18": 86.05,
          "additional_child_over_18_school": 277.96,
          "spouse_aid_and_attendance": 158.82
        }
      },
      "smc_m_half": {
        "base": {
          "veteran_alone": 4557.08,
          "veteran_spouse": 4730.26,
          "veteran_spouse_one_parent": 4870.13,
          "veteran_spouse_two_parents": 5010.00,
          "veteran_one_parent": 4696.95,
          "veteran_two_parents": 4836.82,
          "veteran_one_child": 4675.07,
          "veteran_spouse_one_child": 4859.38,
          "veteran_spouse_one_parent_one_child": 4999.25,
          "veteran_spouse_two_parents_one_child": 5139.12,
          "veteran_one_parent_one_child": 4814.94,
          "veteran_two_parents_one_child": 4954.81
        },
        "addons": {
          "additional_child_under_18": 86.05,
          "additional_child_over_18_school": 277.96,
          "spouse_aid_and_attendance": 158.82
        }
      },
      "smc_n": {
        "base": {
          "veteran_alone": 4850.57,
          "veteran_spouse": 5023.75,
          "veteran_spouse_one_parent": 5163.62,
          "veteran_spouse_two_parents": 5303.49,
          "veteran_one_parent": 4990.44,
          "veteran_two_parents": 5130.31,
          "veteran_one_child": 4968.56,
          "veteran_spouse_one_child": 5152.87,
          "veteran_spouse_one_parent_one_child": 5292.74,
          "veteran_spouse_two_parents_one_child": 5432.61,
          "veteran_one_parent_one_child": 5108.43,
          "veteran_two_parents_one_child": 5248.30
        },
        "addons": {
          "additional_child_under_18": 86.05,
          "additional_child_over_18_school": 277.96,
          "spouse_aid_and_attendance": 158.82
        }
      },
      "smc_n_half": {
        "base": {
          "veteran_alone": 5133.03,
          "veteran_spouse": 5306.21,
          "veteran_spouse_one_parent": 5446.08,
          "veteran_spouse_two_parents": 5585.95,
          "veteran_one_parent": 5272.90,
          "veteran_two_parents": 5412.77,
          "veteran_one_child": 5251.02,
          "veteran_spouse_one_child": 5435.33,
          "veteran_spouse_one_parent_one_child": 5575.20,
          "veteran_spouse_two_parents_one_child": 5715.07,
          "veteran_one_parent_one_child": 5390.89,
          "veteran_two_parents_one_child": 5530.76
        },
        "addons": {
          "additional_child_under_18": 86.05,
          "additional_child_over_18_school": 277.96,
          "spouse_aid_and_attendance": 158.82
        }
      },
      "smc_op": {
        "base": {
          "veteran_alone": 5416.28,
          "veteran_spouse": 5589.46,
          "veteran_spouse_one_parent": 5729.33,
          "veteran_spouse_two_parents": 5869.20,
          "veteran_one_parent": 5556.15,
          "veteran_two_parents": 5696.02,
          "veteran_one_child": 5534.27,
          "veteran_spouse_one_child": 5718.58,
          "veteran_spouse_one_parent_one_child": 5858.45,
          "veteran_spouse_two_parents_one_child": 5998.32,
          "veteran_one_parent_one_child": 5674.14,
          "veteran_two_parents_one_child": 5814.01
        },
        "addons": {
          "additional_child_under_18": 86.05,
          "additional_child_over_18_school": 277.96,
          "spouse_aid_and_attendance": 158.82
        }
      },
      "smc_r1": {
        "base": {
          "veteran_alone": 7744.13,
          "veteran_spouse": 7917.31,
          "veteran_spouse_one_parent": 8057.18,
          "veteran_spouse_two_parents": 8197.05,
          "veteran_one_parent": 7884.00,
          "veteran_two_parents": 8023.87,
          "veteran_one_child": 7862.12,
          "veteran_spouse_one_child": 8046.43,
          "veteran_spouse_one_parent_one_child": 8186.30,
          "veteran_spouse_two_parents_one_child": 8326.17,
          "veteran_one_parent_one_child": 8001.99,
          "veteran_two_parents_one_child": 8141.86
        },
        "addons": {
          "additional_child_under_18": 86.05,
          "additional_child_over_18_school": 277.96,
          "spouse_aid_and_attendance": 158.82
        }
      },
      "smc_r2_t": {
        "base": {
          "veteran_alone": 8883.84,
          "veteran_spouse": 9057.02,
          "veteran_spouse_one_parent": 9196.89,
          "veteran_spouse_two_parents": 9336.76,
          "veteran_one_parent": 9023.71,
          "veteran_two_parents": 9163.58,
          "veteran_one_child": 9001.83,
          "veteran_spouse_one_child": 9186.14,
          "veteran_spouse_one_parent_one_child": 9326.01,
          "veteran_spouse_two_parents_one_child": 9465.88,
          "veteran_one_parent_one_child": 9141.70,
          "veteran_two_parents_one_child": 9281.57
        },
        "addons": {
          "additional_child_under_18": 86.05,
          "additional_child_over_18_school": 277.96,
          "spouse_aid_and_attendance": 158.82
        }
      },
      "smc_s": {
        "base": {
          "veteran_alone": 3473.86,
          "veteran_spouse": 3647.04,
          "veteran_spouse_one_parent": 3786.91,
          "veteran_spouse_two_parents": 3926.78,
          "veteran_one_parent": 3613.73,
          "veteran_two_parents": 3753.60,
          "veteran_one_child": 3591.85,
          "veteran_spouse_one_child": 3776.16,
          "veteran_spouse_one_parent_one_child": 3916.03,
          "veteran_spouse_two_parents_one_child": 4055.90,
          "veteran_one_parent_one_child": 3731.72,
          "veteran_two_parents_one_child": 3871.59
        },
        "addons": {
          "additional_child_under_18": 86.05,
          "additional_child_over_18_school": 277.96,
          "spouse_aid_and_attendance": 158.82
        }
      }
    }
  }

]