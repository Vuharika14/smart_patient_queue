// ── HOSPITAL DATA ──────────────────────────────────────
const HOSPITALS = [
  {
    id: 1, name: "Apollo Hospitals", city: "Chennai", rating: 4.9,
    emoji: "🏥", type: "Multi",
    desc: "Asia's largest healthcare provider, Apollo Hospitals is a beacon of world-class medical care. Known for cardiac, oncology, and organ transplant excellence.",
    depts: ["Cardiology","Oncology","Neurology","Orthopedics","Nephrology"],
    facilities: ["ICU","NICU","24/7 Pharmacy","Blood Bank","MRI","CT Scan","Dialysis","Ambulance"],
    insurance: ["Star Health","HDFC Ergo","Bajaj Allianz","New India","ECHS"],
    address: "21, Greams Lane, Chennai – 600006", phone: "044-28290200", email: "helpdesk@apollohospitals.com",
    reviews: [
      {a:"Kavitha Suresh",r:5,t:"World-class treatment and extremely professional staff. The cardiology department is outstanding."},
      {a:"Rajan Pillai",r:5,t:"My father underwent bypass surgery here. The entire team was exceptional. Highly recommend."}
    ],
    gallery: ["🏥","🔬","❤️","💊","🛏️","🩺"],
    doctors: [
      {name:"Dr. P. Venugopal",spec:"Cardiology",fee:1200,emoji:"👨‍⚕️"},
      {name:"Dr. Anita Krishnan",spec:"Oncology",fee:1500,emoji:"👩‍⚕️"},
      {name:"Dr. Ramesh Iyer",spec:"Neurology",fee:1000,emoji:"👨‍⚕️"},
      {name:"Dr. Sunita Menon",spec:"Orthopedics",fee:900,emoji:"👩‍⚕️"}
    ]
  },
  {
    id: 2, name: "AIIMS New Delhi", city: "Delhi", rating: 4.8,
    emoji: "🏛️", type: "Govt",
    desc: "India's premier medical institution and teaching hospital. AIIMS provides world-class tertiary care with highly subsidized rates for all citizens.",
    depts: ["General Medicine","Surgery","Pediatrics","Gynecology","Cardiology","Neurology"],
    facilities: ["Trauma Centre","Burn Unit","Eye Centre","Dental","Blood Bank","24/7 Emergency","Research Labs"],
    insurance: ["CGHS","ESI","Ayushman Bharat","All Private Insurers"],
    address: "Sri Aurobindo Marg, Ansari Nagar, New Delhi – 110029", phone: "011-26588500", email: "director@aiims.edu",
    reviews: [
      {a:"Meera Singh",r:5,t:"The best government hospital in India. Exceptional doctors and research-driven treatment."},
      {a:"Ashok Gupta",r:4,t:"Long wait times but the quality of care is unmatched. The specialists are top-notch."}
    ],
    gallery: ["🏛️","🔬","🩺","💉","🧬","📋"],
    doctors: [
      {name:"Dr. Ravi Shankar",spec:"Cardiology",fee:300,emoji:"👨‍⚕️"},
      {name:"Dr. Priya Agarwal",spec:"Neurology",fee:300,emoji:"👩‍⚕️"},
      {name:"Dr. Suresh Babu",spec:"General Surgery",fee:200,emoji:"👨‍⚕️"},
      {name:"Dr. Meena Kumari",spec:"Pediatrics",fee:200,emoji:"👩‍⚕️"}
    ]
  },
  {
    id: 3, name: "Fortis Memorial Research Institute", city: "Gurgaon", rating: 4.7,
    emoji: "🏗️", type: "Private",
    desc: "A flagship hospital of the Fortis group, FMRI is a quaternary care center with cutting-edge robotics surgery, organ transplants, and neurosciences.",
    depts: ["Neuro-Sciences","Cardiac Sciences","Renal Sciences","Bone & Joint","Cancer Institute"],
    facilities: ["Robotic Surgery","Da Vinci System","LVAD","PET-CT","Gamma Knife","Hyperbaric Chamber"],
    insurance: ["Medi Assist","Vidal Health","Raksha TPA","HDFC","ICICI Lombard"],
    address: "Sector 44, Opposite HUDA City Centre, Gurgaon – 122002", phone: "0124-4921021", email: "fmri@fortishealthcare.com",
    reviews: [
      {a:"Anil Mehta",r:5,t:"Robotic knee replacement done here. The precision and post-op care were phenomenal."},
      {a:"Deepa Nair",r:4,t:"Very modern facility. The nursing staff is incredibly attentive and caring."}
    ],
    gallery: ["🏗️","🤖","🧠","❤️","🦴","🔭"],
    doctors: [
      {name:"Dr. Atul Kumar",spec:"Neuro-Sciences",fee:2000,emoji:"👨‍⚕️"},
      {name:"Dr. Vandana Seth",spec:"Cardiac Sciences",fee:1800,emoji:"👩‍⚕️"},
      {name:"Dr. Mohan Lal",spec:"Bone & Joint",fee:1500,emoji:"👨‍⚕️"},
      {name:"Dr. Sonia Grover",spec:"Cancer Institute",fee:2200,emoji:"👩‍⚕️"}
    ]
  },
  {
    id: 4, name: "Manipal Hospitals", city: "Bangalore", rating: 4.6,
    emoji: "💠", type: "Multi",
    desc: "A leading multi-specialty hospital with 29 hospitals across India. Manipal is renowned for organ transplants, oncology and advanced diagnostics.",
    depts: ["Transplant","Oncology","Cardiac","Emergency","Spine","Dermatology"],
    facilities: ["Liver Transplant","Bone Marrow Transplant","Linear Accelerator","3T MRI","24/7 ER","Pharmacy"],
    insurance: ["Cigna","Aetna","HDFC","Bajaj","Reliance","Max Bupa"],
    address: "#98, HAL Airport Road, Bangalore – 560017", phone: "080-25024444", email: "info@manipalhospitals.com",
    reviews: [
      {a:"Vikram Rao",r:5,t:"Liver transplant done here successfully. The transplant team is absolutely world-class."},
      {a:"Shanta Reddy",r:4,t:"Great hospital for cancer treatment. The oncology team is very compassionate."}
    ],
    gallery: ["💠","🔬","🩺","💉","🧬","🌡️"],
    doctors: [
      {name:"Dr. Nanda Kumar",spec:"Transplant Surgery",fee:3000,emoji:"👨‍⚕️"},
      {name:"Dr. Leela Priya",spec:"Oncology",fee:2500,emoji:"👩‍⚕️"},
      {name:"Dr. Ajay Hegde",spec:"Cardiac Sciences",fee:1800,emoji:"👨‍⚕️"},
      {name:"Dr. Rekha Rao",spec:"Spine Surgery",fee:2000,emoji:"👩‍⚕️"}
    ]
  },
  {
    id: 5, name: "KEM Hospital Mumbai", city: "Mumbai", rating: 4.5,
    emoji: "🏩", type: "Govt",
    desc: "King Edward Memorial Hospital is one of Mumbai's oldest and most trusted public hospitals. Providing affordable care to millions since 1926.",
    depts: ["General Medicine","Pediatrics","Burns","Trauma","Gynecology","Psychiatry"],
    facilities: ["Burns Unit","Trauma Centre","Blood Bank","Free OPD","Dialysis","24/7 Emergency"],
    insurance: ["Ayushman Bharat","ESI","CGHS","Maharashtra Govt Schemes"],
    address: "Acharya Donde Marg, Parel, Mumbai – 400012", phone: "022-24107000", email: "kemhospital@brihanmumbai.gov.in",
    reviews: [
      {a:"Sunita Patil",r:5,t:"Best government hospital in Mumbai. The doctors are incredibly dedicated despite limited resources."},
      {a:"Manoj Jadhav",r:4,t:"Affordable treatment for everyone. The pediatric unit is very well managed."}
    ],
    gallery: ["🏩","👶","🩹","🚑","💊","📊"],
    doctors: [
      {name:"Dr. Shrikant Patil",spec:"General Medicine",fee:100,emoji:"👨‍⚕️"},
      {name:"Dr. Asha Kulkarni",spec:"Pediatrics",fee:100,emoji:"👩‍⚕️"},
      {name:"Dr. Vijay Desai",spec:"Orthopedics",fee:150,emoji:"👨‍⚕️"},
      {name:"Dr. Manisha Nair",spec:"Gynecology",fee:100,emoji:"👩‍⚕️"}
    ]
  },
  {
    id: 6, name: "Narayana Health", city: "Bangalore", rating: 4.7,
    emoji: "💚", type: "Multi",
    desc: "Founded by Dr. Devi Shetty, Narayana Health makes world-class cardiac care affordable. They perform over 35 heart surgeries every day.",
    depts: ["Cardiac Surgery","Cardiology","Pediatric Cardiac","Neurology","Orthopedics","Ophthalmology"],
    facilities: ["CATH Lab","ECMO","Pediatric ICU","Heart Failure Clinic","Valve Clinic","Cardiac Rehab"],
    insurance: ["All TPA","Yeshasvini","Rajiv Arogyasri","RSBY","All PSU Insurers"],
    address: "258/A, Bommasandra Industrial Area, Bangalore – 560099", phone: "1800-103-6233", email: "nhhealth@narayanahealth.org",
    reviews: [
      {a:"Gopal Krishna",r:5,t:"World's most affordable open heart surgery. Dr. Shetty's team saved my son's life."},
      {a:"Radha Krishnan",r:5,t:"Exceptional cardiology team. The post-operative care and follow-up are outstanding."}
    ],
    gallery: ["💚","❤️","🔬","💊","🏃","🩺"],
    doctors: [
      {name:"Dr. Devi Shetty",spec:"Cardiac Surgery",fee:5000,emoji:"👨‍⚕️"},
      {name:"Dr. Ramkumar",spec:"Pediatric Cardiac",fee:2000,emoji:"👨‍⚕️"},
      {name:"Dr. Usha Rani",spec:"Cardiology",fee:1500,emoji:"👩‍⚕️"},
      {name:"Dr. Pradeep Nair",spec:"Neurology",fee:1200,emoji:"👨‍⚕️"}
    ]
  }
];
