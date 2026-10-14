window.NEXUS_DATA = {
  artifacts: [
    {
      id:"secaidev",
      title:"SecAIDev",
      type:"Tool",
      year:2026,
      authors:"Gurjas Chalana and Karim Elish",
      description:"Interactive security workbench for analyzing agent-authored pull requests through evidence-oriented security exposure, potential risk, mitigation, review-quality, and false-assurance signals.",
      areas:["Software Security & Privacy","Trustworthy AI","AI-Assisted Software Engineering","Software Analysis & Analytics","Empirical Software Engineering"],
      topics:["AI Agents","Agent-Authored Pull Requests","AI-Assisted Software Engineering","Security Assurance","False Assurance","Code Review","Software Security","Empirical Study"],
      demo:"https://agent-pr-dashboard.vercel.app/",
      repo:"https://github.com/GurjasChalana/Agent-PR-Dashboard",
      image:"/images/SecAIDev.png"
    },
    {
      id:"andrometric",
      title:"AndroMetric",
      type:"Dataset",
      year:2026,
      authors:"Sebastian Siedler and Karim Elish",
      description:"Large-scale Android app metrics dataset connecting multi-dimensional software metrics with malware-risk analysis and security-aware software quality assessment.",
      areas:["Software Quality & Metrics","Software Security & Privacy","Mobile & Android Security","Software Analysis & Analytics","Empirical Software Engineering"],
      topics:["Software Metrics","Software Quality","Mobile Security","Android","Malware Risk","Software Analytics","Empirical Study","Dataset"],
      paper:"https://dl.acm.org/doi/10.1145/3793302.3793329",
      data:"https://zenodo.org/records/17559667",
      image:"/images/AndroMetric.png"
    },
    {
      id:"wearappsec",
      title:"WearAppSec",
      type:"Dataset",
      year:2026,
      authors:"Sebastian Siedler, Mohamed Sylla, and Karim Elish",
      description:"Security dataset for wearable companion mobile applications supporting systematic assessment of mobile and wearable-app security.",
      areas:["Software Security & Privacy","Mobile & Android Security","Empirical Software Engineering"],
      topics:["Wearables","Mobile Security","Android","OWASP MASVS","Privacy","Software Security","Dataset"],
      paper:"https://karim-elish.github.io/nexus-lab/artifacts/",
      data:"https://ieee-dataport.org/documents/wearappsec-wearable-mobile-app-security-dataset",
      image:"/images/WearAppSec.png"
    },
    {
      id:"smelldroid",
      title:"SMELLDroid",
      type:"Dataset",
      year:2026,
      authors:"Joyce Champie, Karim Elish, and Mahmoud Elish",
      description:"Large-scale Android code smell dataset supporting empirical research on software quality, maintainability, and comparative app analysis.",
      areas:["Software Quality & Metrics","Software Analysis & Analytics","Mobile & Android Security","Empirical Software Engineering"],
      topics:["Code Smells","Software Quality","Maintainability","Android","Software Analytics","Empirical Study","Dataset"],
      paper:"https://dl.acm.org/doi/10.1145/3793302.3793330",
      data:"https://zenodo.org/records/17559693",
      image:"/images/SMELLDroid.png"
    },
    {
      id:"mirror",
      title:"MIRROR",
      type:"Dataset",
      year:2026,
      authors:"Sebastian Siedler and Karim Elish",
      description:"Structural metrics dataset for original and repackaged Android applications supporting reuse, repackaging, and structural similarity analysis.",
      areas:["Software Analysis & Analytics","Software Quality & Metrics","Mobile & Android Security","Empirical Software Engineering"],
      topics:["Repackaging","Structural Metrics","Software Metrics","Android","Software Analytics","Software Reuse","Dataset"],
      paper:"https://dl.acm.org/doi/10.1145/3793655.3793713",
      data:"https://zenodo.org/records/17666395",
      image:"/images/MIRROR.png"
    },
    {
      id:"mvcdroid",
      title:"MVCDroid",
      type:"Dataset",
      year:2026,
      authors:"Mohamed Sylla and Karim Elish",
      description:"Architectural MVC-separation dataset for Android security studies, structural analysis, and architecture-level empirical research.",
      areas:["Software Security & Privacy","Mobile & Android Security","Software Analysis & Analytics","Empirical Software Engineering"],
      topics:["Android Security","Software Architecture","MVC","Architectural Smells","Software Assurance","Empirical Study","Dataset"],
      paper:"https://ieeexplore.ieee.org/document/11641174",
      data:"https://zenodo.org/records/18633276",
      image:"/images/MVCDroid.png"
    },
    {
      id:"droidmalvet",
      title:"DroidMalVet",
      type:"Dataset",
      year:2022,
      authors:"Karim Elish, Mahmoud Elish, and Hussain Almohri",
      description:"Android malware family dataset with compact code-level metrics for malware family detection, characterization, and analysis.",
      areas:["Malware & Vulnerability Analysis","Mobile & Android Security","Software Quality & Metrics","Empirical Software Engineering"],
      topics:["Android Malware","Malware Families","Malware Detection","Software Metrics","Code Metrics","Android","Dataset"],
      paper:"https://ieeexplore.ieee.org/document/9682574",
      data:"https://zenodo.org/records/18315281",
      image:"/images/DroidMalVet.png"
    }
  ],
  publications: [
{
  year:2026,
  title:"Security Risks in Wearable Mobile Applications",
  authors:"Sebastian Siedler, Mohamed Sylla, and Karim Elish",
  venue:"IEEE Internet Computing, Accepted for publication, September 2026. To appear",
  areas:[
    "Software Security & Privacy",
    "Mobile & Android Security",
    "Empirical Software Engineering"
  ],
  topics:[
    "Wearables",
    "Mobile Security",
    "Android",
    "Software Security",
    "OWASP MASVS",
    "Empirical Study"
  ]
},
    {year:2026,title:"Large Language Models for Malware Detection: A Systematic Review, Taxonomy, and Open Challenges",authors:"Joyce Champie and Karim Elish",venue:"IEEE Access, vol. 14, pp. 52734–52752",areas:["Malware & Vulnerability Analysis", "Trustworthy AI"],topics:["Large Language Models", "Malware Detection", "Malware Analysis", "AI for Security", "Systematic Review"]},
    {year:2026,title:"STALKER: Composed Quasi-Identifiers and LLM-Amplified Behavioral Leakage in Anonymized Marketplace Data",authors:"Anastasiya Dmytryk, Sami El-Yaagoubi, Lucas Batista, Philipp Kouterguine, Samuel Gerken, Abdulaziz Alhamadani, and Karim Elish",venue:"Proceedings of the 12th ACM International Workshop on Security and Privacy Analytics (IWSPA), co-located with the 16th ACM Conference on Data and Application Security and Privacy (CODASPY)",areas:["Software Security & Privacy", "Trustworthy AI"],topics:["Privacy", "Anonymization", "Large Language Models", "Behavioral Leakage", "Quasi-Identifiers", "Marketplace Data"]},
    {year:2026,title:"Rethinking MVC Violations as Security-Aware Architectural Smells in Android Applications",authors:"Mohamed Sylla and Karim Elish",venue:"Proceedings of the 23rd IEEE International Conference on Software Architecture (ICSA-Companion)",areas:["Software Security & Privacy", "Mobile & Android Security", "Software Analysis & Analytics"],topics:["Android Security", "Software Architecture", "MVC", "Architectural Smells", "Code Smells", "Software Assurance"],award:"Distinguished Paper Award Candidate"},
    {year:2026,title:"Automated Reproduction of Android Application Bugs with LLMs: Are We There Yet?",authors:"Dennis Carey, Karim Elish, and Paniz Abedin",venue:"Proceedings of the 19th IEEE International Conference on Software Testing, Verification and Validation (ICST)",areas:["AI-Assisted Software Engineering", "Mobile & Android Security", "Empirical Software Engineering"],topics:["Large Language Models", "AI-Assisted Software Engineering", "Bug Reproduction", "Android", "Software Testing", "Empirical Study"]},
    {year:2026,title:"AndroMetric: Bridging Multi-Dimensional Software Metrics and Mobile Application Security",authors:"Sebastian Siedler and Karim Elish",venue:"Proceedings of the 23rd IEEE/ACM International Conference on Mining Software Repositories (MSR), Data and Tool Showcase Track",areas:["Software Quality & Metrics", "Software Security & Privacy", "Mobile & Android Security", "Software Analysis & Analytics", "Empirical Software Engineering"],topics:["Software Metrics", "Software Quality", "Mobile Security", "Android", "Malware Risk", "Software Analytics", "Empirical Study", "Dataset"]},
    {year:2026,title:"SMELLDroid: A Dataset for Code Smells in Android Apps",authors:"Joyce Champie, Karim Elish, and Mahmoud Elish",venue:"Proceedings of the 23rd IEEE/ACM International Conference on Mining Software Repositories (MSR), Data and Tool Showcase Track",areas:["Software Quality & Metrics", "Software Analysis & Analytics", "Mobile & Android Security", "Empirical Software Engineering"],topics:["Code Smells", "Software Quality", "Maintainability", "Android", "Software Analytics", "Empirical Study", "Dataset"]},
    {year:2026,title:"MIRROR: A Dataset of Structural Metrics for Repackaged Android Apps",authors:"Sebastian Siedler and Karim Elish",venue:"Proceedings of the 3rd ACM International Conference on AI Foundation Models and Software Engineering (FORGE)",areas:["Software Analysis & Analytics", "Software Quality & Metrics", "Mobile & Android Security", "Empirical Software Engineering"],topics:["Repackaging", "Structural Metrics", "Software Metrics", "Android", "Software Analytics", "Software Reuse", "Dataset"]},
    {year:2025,title:"RepackDroid: An Efficient Detection Model for Repackaged Android Applications",authors:"Tito Leadon and Karim Elish",venue:"Information, vol. 16, no. 12, Article 1075",areas:["Mobile & Android Security", "Malware & Vulnerability Analysis"],topics:["Repackaged Apps", "Android", "Mobile Security", "Malware Detection", "Machine Learning"]},
    {year:2025,title:"High-Accuracy Android Ransomware Detection Using SMALI Code-Based Analysis",authors:"Vinicius Seixas and Karim Elish",venue:"Proceedings of the IEEE International Conference on Artificial Intelligence, Computer, Data Sciences and Applications (ACDSA)",areas:["Malware & Vulnerability Analysis", "Mobile & Android Security", "Software Analysis & Analytics"],topics:["Android Malware", "Ransomware", "SMALI", "Malware Detection", "Static Analysis"]},
    {year:2025,title:"Stealthy No More: An Effective Ensemble Learning Approach for Detecting Android RATs",authors:"Nesreen Dalhy and Karim Elish",venue:"Proceedings of the IEEE/ACIS 23rd International Conference on Software Engineering Research, Management and Applications (SERA)",areas:["Malware & Vulnerability Analysis", "Mobile & Android Security"],topics:["Android Malware", "Remote Access Trojans", "RATs", "Malware Detection", "Ensemble Learning", "Machine Learning"]},
    {year:2025,title:"FSProtoTransfer: Synergizing Few-Shot, Prototypical Networks, and Transfer Learning for Intrusion Detection in VANETs",authors:"Ayesha Dina, Colby Edell, Karim Elish, and Arijet Sarker",venue:"Proceedings of the 38th International FLAIRS Conference, Florida Artificial Intelligence Research Society (FLAIRS)",areas:["Trustworthy AI", "Software Security & Privacy"],topics:["Intrusion Detection", "VANETs", "Few-Shot Learning", "Prototypical Networks", "Transfer Learning", "AI for Security"]},
    {year:2022,title:"Lightweight, Effective Detection and Characterization of Mobile Malware Families",authors:"Karim Elish, Mahmoud Elish, and Hussain Almohri",venue:"IEEE Transactions on Computers (TC), vol. 71, no. 11",areas:["Malware & Vulnerability Analysis", "Mobile & Android Security", "Software Quality & Metrics"],topics:["Mobile Malware", "Malware Families", "Malware Detection", "Code Metrics", "Software Metrics", "Android"]},
    {year:2020,title:"Identifying Mobile Inter-App Communication Risks",authors:"Karim Elish, Haipeng Cai, Daniel Barton, Danfeng Yao, and Barbara Ryder",venue:"IEEE Transactions on Mobile Computing (TMC), vol. 19, no. 1",areas:["Software Security & Privacy", "Mobile & Android Security", "Software Analysis & Analytics"],topics:["Android", "Inter-App Communication", "Mobile Security", "Program Analysis", "Data Flow", "Software Security"]},
    {year:2019,title:"Identifying Android Malware Families Using Android-Oriented Metrics",authors:"William Blanc, Lina Hashem, Karim Elish, and Hussain Almohri",venue:"Proceedings of the IEEE International Conference on Big Data (Big Data)",areas:["Malware & Vulnerability Analysis", "Mobile & Android Security", "Software Quality & Metrics", "Software Analysis & Analytics"],topics:["Android Malware", "Malware Families", "Software Metrics", "Malware Detection", "Android", "Software Analytics"]},
  ],
  people: {
    current: [
      /*{name:"Philipp Schafer",role:"Fulbright Graduate Fellow", photo: "/nexus-lab/assets/img/people/Philipp.png"},*/
      /*{name:"Johannes Bohme",role:"Fulbright Graduate Fellow", photo: "/nexus-lab/assets/img/people/Johannes.png"},*/
      {name:"Mohamed Sylla",role:"Master's Student · Fulbright", photo: "/nexus-lab/assets/img/people/Sylla.png"},
      {name:"Nicholas Carracino",role:"Master's Student", photo: "/nexus-lab/assets/img/people/Nicholas.png"},
      {name:"Shane Califano",role:"Master's Student", photo: "/nexus-lab/assets/img/people/Shane.png"}, 
      {name:"William Blaine",role:"Undergraduate · Killam Fellowships / Fulbright", photo: "/nexus-lab/assets/img/people/Will.png"},
      {name:"Justine Bailey",role:"Undergraduate Researcher", photo: "/nexus-lab/assets/img/people/Justine.png"}
    ],
    alumni: [
      {name:"Sebastian Siedler",role:"Master's Student · Fulbright Graduate Fellow", year:"2026", photo: "/nexus-lab/assets/img/people/Sebastian.png"},
      {name:"Joyce Champie",role:"Master's Student",year:"2026", photo: "/nexus-lab/assets/img/people/Joyce.png"},
      {name:"Gurjas Chalana",role:"Undergraduate · Killam Fellowships / Fulbright",year:"2026", photo: "/nexus-lab/assets/img/people/Gurjas.png"},
      {name:"Dennis Carey",role:"Undergraduate Researcher", year:"2026", photo: "/nexus-lab/assets/img/people/student-name.png"},
      {name:"Nesreen Dalhy",role:"Master's Student",year:"2025", photo: "/nexus-lab/assets/img/people/Nesreen.png"},
      {name:"Vinicius Seixas",role:"Master's Student",year:"2022", photo: "/nexus-lab/assets/img/people/Vin.png"},
      {name:"Tito Leadon",role:"Master's Student",year:"2022", photo: "/nexus-lab/assets/img/people/student-name.png"},
      {name:"William Blanc",role:"Undergraduate Researcher",year:"2021", photo: "/nexus-lab/assets/img/people/William.png"}
    ]
  }
};
