import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Which of the following is NOT a function of integral membrane proteins?",
    options: [
      "Act as adhesion molecules",
      "Act as ion channels",
      "Act as enzymes",
      "Act as structural support for the cell membrane"
    ],
    answer: 3,
    explanation: "Integral membrane proteins act as adhesion molecules, pumps, carriers, ion channels, receptors, enzymes, and glycoproteins, but not as structural support (which is primarily mediated by the peripheral cytoskeleton like spectrin and actin).",
    category: "Cell Biology",
    highYieldPearl: "Integral proteins span the lipid bilayer; peripheral proteins attach to surfaces and connect with the cytoskeleton.",
    difficulty: "High-Yield"
  },
  {
    id: 2,
    question: "The Nissl bodies found in neurons are histologically equivalent to which organelle?",
    options: [
      "Smooth endoplasmic reticulum",
      "Rough endoplasmic reticulum",
      "Golgi apparatus",
      "Lysosomes"
    ],
    answer: 1,
    explanation: "Nissl bodies (chromatophilic substance) are prominent clusters of Rough Endoplasmic Reticulum (RER) with free polyribosomes in neurons dedicated to synthesizing peptide neurotransmitters and structural proteins.",
    category: "Cell Biology",
    highYieldPearl: "Nissl bodies are found in the soma and dendrites, but are strictly ABSENT from the axon hillock and axon.",
    difficulty: "Critical"
  },
  {
    id: 3,
    question: "Which of the following cell types is rich in Smooth Endoplasmic Reticulum?",
    options: [
      "Goblet cells",
      "Plasma cells",
      "Hepatocytes",
      "Pancreatic acinar cells"
    ],
    answer: 2,
    explanation: "Hepatocytes and steroid hormone-producing cells of the adrenal cortex and gonads (Leydig cells, luteal cells) are richly supplied with SER for lipid synthesis, detoxification, and glycogen metabolism.",
    category: "Cell Biology",
    highYieldPearl: "SER functions: lipid/steroid synthesis, drug detoxification via cytochrome P450, and calcium storage (sarcoplasmic reticulum in muscle).",
    difficulty: "High-Yield"
  },
  {
    id: 4,
    question: "Which organelle is responsible for the synthesis of acrosome in spermatozoa?",
    options: [
      "Ribosome",
      "Rough ER",
      "Golgi apparatus",
      "Lysosome"
    ],
    answer: 2,
    explanation: "The Golgi apparatus packages acrosomal enzymes (hyaluronidase, acrosin) into the acrosomal cap over the anterior two-thirds of the sperm nucleus, functioning as a specialized giant lysosome.",
    category: "Cell Biology",
    highYieldPearl: "Spermiogenesis involves condensation of nucleus, acrosome formation from Golgi, and formation of flagellum from centriole.",
    difficulty: "High-Yield"
  },
  {
    id: 5,
    question: "Which type of chromatin is deeply stained during interphase?",
    options: [
      "Euchromatin",
      "Heterochromatin",
      "Nucleosome",
      "Nucleoporin"
    ],
    answer: 1,
    explanation: "Heterochromatin is condensed, transcriptionally inactive chromatin that stains deeply with basophilic dyes (coarse and electron-dense), whereas euchromatin is dispersed and active.",
    category: "Cell Biology",
    highYieldPearl: "Heterochromatin = Highly condensed, Inactive; Euchromatin = Extended, active for transcription.",
    difficulty: "Standard"
  },
  {
    id: 6,
    question: "What is the diameter range of most human cells?",
    options: [
      "1-3 µm",
      "5-50 µm",
      "50-100 µm",
      "100-200 µm"
    ],
    answer: 1,
    explanation: "Most human somatic cells range between 5 µm and 50 µm in diameter. (RBCs are ~7.5 µm, while oocytes reach up to ~120 µm).",
    category: "Cell Biology",
    highYieldPearl: "Smallest cell: cerebellar granule cell / RBC (~4–7.5 µm); Largest cell: mature human ovum (~120–140 µm).",
    difficulty: "Standard"
  },
  {
    id: 7,
    question: "Which of the following is NOT a component of ground substance?",
    options: [
      "Glycosaminoglycans",
      "Proteoglycans",
      "Collagen fibers",
      "Multiadhesive glycoproteins"
    ],
    answer: 2,
    explanation: "Extracellular matrix (ECM) comprises fibrous proteins (collagen, elastic, reticular fibers) and amorphous ground substance. Ground substance consists of GAGs, proteoglycans, and multiadhesive glycoproteins (fibronectin, laminin).",
    category: "General Histology",
    highYieldPearl: "ECM = Fibers + Ground Substance. Ground substance is hydrated and transparent in life.",
    difficulty: "High-Yield"
  },
  {
    id: 8,
    question: "Which type of cartilage lacks perichondrium?",
    options: [
      "Elastic cartilage",
      "Hyaline cartilage",
      "Fibrocartilage",
      "Articular cartilage"
    ],
    answer: 3,
    explanation: "Articular cartilage (hyaline cartilage covering synovial joint surfaces) and fibrocartilage do not possess a perichondrium, which is why articular cartilage has very limited capacity for regeneration.",
    category: "General Histology",
    highYieldPearl: "Articular cartilage lacks perichondrium; it receives nutrition solely via diffusion from synovial fluid.",
    difficulty: "Critical"
  },
  {
    id: 9,
    question: "The thymus contains characteristic structures called:",
    options: [
      "Malpighian bodies",
      "Hassall's corpuscles",
      "Peyer's patches",
      "Billroth's cords"
    ],
    answer: 1,
    explanation: "Hassall's (thymic) corpuscles are concentrically arranged epithelial reticular cells located specifically in the thymic medulla and secrete cytokines like TSLP.",
    category: "General Histology",
    highYieldPearl: "Hassall's corpuscles are pathognomonic histological hallmarks of the thymic medulla.",
    difficulty: "High-Yield"
  },
  {
    id: 10,
    question: "Which epithelial type lines the proximal convoluted tubule of the kidney?",
    options: [
      "Simple squamous",
      "Simple cuboidal with prominent brush border",
      "Simple columnar",
      "Pseudostratified columnar"
    ],
    answer: 1,
    explanation: "The proximal convoluted tubule (PCT) is lined by simple cuboidal epithelium with densely packed microvilli forming an extensive brush border designed for massive reabsorption.",
    category: "General Histology",
    highYieldPearl: "PCT has a prominent brush border and indistinct cell boundaries; DCT has no brush border and clear distinct lumens.",
    difficulty: "Critical"
  },
  {
    id: 11,
    question: "Which of the following is a holocrine gland?",
    options: [
      "Sweat gland",
      "Pancreas",
      "Sebaceous gland",
      "Salivary gland"
    ],
    answer: 2,
    explanation: "Sebaceous glands are holocrine glands where the whole cell undergoes apoptosis and is discharged with its secretum (sebum). Merocrine discharges by exocytosis, while apocrine releases apical cytoplasm.",
    category: "General Histology",
    highYieldPearl: "Holocrine: whole cell disintegrates (Sebaceous, Meibomian); Apocrine: apex pinches off (Lactating mammary, apocrine sweat); Merocrine: exocytosis (Salivary, eccrine sweat).",
    difficulty: "High-Yield"
  },
  {
    id: 12,
    question: "The \"growing end\" of a long bone is directed:",
    options: [
      "Towards the nutrient foramen",
      "Away from the nutrient foramen",
      "Always towards the knee",
      "Always towards the shoulder"
    ],
    answer: 1,
    explanation: "The nutrient artery runs obliquely away from the growing end of the bone. Therefore, the growing end is directed away from the direction of the nutrient canal ('To the elbow I go, from the knee I flee').",
    category: "General Histology",
    highYieldPearl: "Mnemonic: 'To the elbow I go, from the knee I flee' describes the direction of nutrient vessels; growing ends are upper humerus, lower radius/ulna, lower femur, upper tibia.",
    difficulty: "Critical"
  },
  {
    id: 13,
    question: "Which type of capillary is found in the liver and spleen?",
    options: [
      "Continuous capillary",
      "Fenestrated capillary",
      "Sinusoid capillary",
      "Tight capillary"
    ],
    answer: 2,
    explanation: "Sinusoidal (discontinuous) capillaries with wide gaps between endothelial cells and an incomplete or absent basement membrane are found in the liver, spleen, bone marrow, and anterior pituitary.",
    category: "General Histology",
    highYieldPearl: "Continuous: CNS, muscle, skin; Fenestrated: kidneys, endocrine glands, intestine; Sinusoidal: liver, spleen, bone marrow.",
    difficulty: "High-Yield"
  },
  {
    id: 14,
    question: "Which of the following structures is NOT found in the epidermis?",
    options: [
      "Langerhans cells",
      "Melanocytes",
      "Merkel cells",
      "Mast cells"
    ],
    answer: 3,
    explanation: "Mast cells reside in connective tissue (the dermis and hypodermis), not in the avascular stratified squamous epidermis. The epidermis contains keratinocytes, melanocytes, Langerhans cells, and Merkel cells.",
    category: "General Histology",
    highYieldPearl: "Epidermal cells: Keratinocytes (85%), Melanocytes (8%), Langerhans cells (APC, 2-8%), Merkel cells (mechanoreceptors).",
    difficulty: "High-Yield"
  },
  {
    id: 15,
    question: "The periarteriolar lymphoid sheath (PALS) in the spleen contains primarily:",
    options: [
      "B lymphocytes",
      "T lymphocytes",
      "Plasma cells",
      "Macrophages"
    ],
    answer: 1,
    explanation: "The PALS forms the white pulp around central arterioles of the spleen and is populated predominantly by T lymphocytes (thymus-dependent zone of the spleen).",
    category: "General Histology",
    highYieldPearl: "Spleen PALS = T cells; Splenic lymphoid follicles/nodules = B cells.",
    difficulty: "High-Yield"
  },
  {
    id: 16,
    question: "Which cells form the blood-brain barrier?",
    options: [
      "Microglia",
      "Oligodendrocytes",
      "Astrocytes",
      "Ependymal cells"
    ],
    answer: 2,
    explanation: "Astrocytes project perivascular end-feet (astrocytic pedicels) that encircle brain capillaries, inducing endothelial cells to form tight junctions (zonulae occludentes), establishing the functional blood-brain barrier.",
    category: "General Histology",
    highYieldPearl: "Primary anatomical barrier = tight junctions of capillary endothelial cells, induced and maintained by astrocyte end-feet.",
    difficulty: "Critical"
  },
  {
    id: 17,
    question: "In which location would you find ciliated pseudostratified columnar epithelium?",
    options: [
      "Esophagus",
      "Vagina",
      "Trachea",
      "Skin"
    ],
    answer: 2,
    explanation: "The trachea and most of the upper respiratory tract are lined by pseudostratified ciliated columnar epithelium containing interspersed goblet cells (the respiratory epithelium).",
    category: "General Histology",
    highYieldPearl: "Respiratory epithelium: Pseudostratified ciliated columnar with goblet cells lines nasal cavity, nasopharynx, trachea, and bronchi.",
    difficulty: "Standard"
  },
  {
    id: 18,
    question: "Which organelle is known as the \"power house of the cell\"?",
    options: [
      "Nucleus",
      "Golgi apparatus",
      "Mitochondria",
      "Endoplasmic reticulum"
    ],
    answer: 2,
    explanation: "Mitochondria are designated the powerhouses of eukaryotic cells because they generate the bulk of cellular ATP through the Krebs cycle, beta-oxidation, and oxidative phosphorylation.",
    category: "Cell Biology",
    highYieldPearl: "Mitochondria contain their own circular double-stranded DNA (maternally inherited) and divide by binary fission.",
    difficulty: "Standard"
  },
  {
    id: 19,
    question: "What type of epithelium lines the renal pelvis?",
    options: [
      "Stratified squamous",
      "Simple columnar",
      "Transitional epithelium",
      "Pseudostratified columnar"
    ],
    answer: 2,
    explanation: "The urinary tract from the renal calyces, renal pelvis, ureters, and bladder to proximal urethra is lined by transitional epithelium (urothelium) featuring umbrella/facet cells.",
    category: "General Histology",
    highYieldPearl: "Transitional epithelium (urothelium) can stretch and form osmotic barriers against hypertonic urine via uroplakin plaques.",
    difficulty: "Standard"
  },
  {
    id: 20,
    question: "Which cell type is responsible for bone resorption?",
    options: [
      "Osteoblast",
      "Osteocyte",
      "Osteoclast",
      "Chondrocyte"
    ],
    answer: 2,
    explanation: "Osteoclasts are large, multinucleated giant cells derived from the monocyte/macrophage hematopoietic lineage that resorb bone by secreting hydrochloric acid and cathepsin K in Howship's lacunae.",
    category: "General Histology",
    highYieldPearl: "Osteoclasts originate from monocyte/macrophage lineage; osteoblasts originate from mesenchymal osteoprogenitor cells.",
    difficulty: "High-Yield"
  },
  {
    id: 21,
    question: "Which of the following is a primary lymphoid organ?",
    options: [
      "Spleen",
      "Lymph node",
      "Thymus",
      "Tonsil"
    ],
    answer: 2,
    explanation: "Primary (central) lymphoid organs are the bone marrow (B cell genesis/maturation) and thymus (T cell maturation). Spleen, lymph nodes, tonsils, and MALT are secondary (peripheral) lymphoid organs.",
    category: "General Histology",
    highYieldPearl: "Primary lymphoid: Bone marrow, Thymus. Secondary lymphoid: Spleen, Lymph nodes, Tonsils, Peyer's patches.",
    difficulty: "High-Yield"
  },
  {
    id: 22,
    question: "The medullary sinuses of lymph nodes contain primarily:",
    options: [
      "T lymphocytes",
      "B lymphocytes and plasma cells",
      "Macrophages only",
      "Dendritic cells"
    ],
    answer: 1,
    explanation: "Medullary cords in lymph nodes are dense with B lymphocytes, antibody-secreting plasma cells, and macrophages, while medullary sinuses transport filtered lymph.",
    category: "General Histology",
    highYieldPearl: "Cortex = B cells (follicles); Paracortex = T cells (high endothelial venules); Medulla = cords with B cells and plasma cells.",
    difficulty: "High-Yield"
  },
  {
    id: 23,
    question: "Which type of muscle has intercalated discs?",
    options: [
      "Skeletal muscle",
      "Cardiac muscle",
      "Smooth muscle",
      "Both skeletal and cardiac muscle"
    ],
    answer: 1,
    explanation: "Intercalated discs are specialized junctional complexes unique to cardiac muscle fibers, containing fascia adherens, desmosomes, and gap junctions for electrical syncytium.",
    category: "General Histology",
    highYieldPearl: "Intercalated discs feature transverse components (fascia adherens, desmosomes for mechanical coupling) and longitudinal components (gap junctions for electrical coupling).",
    difficulty: "Standard"
  },
  {
    id: 24,
    question: "The spermatozoon is propelled forward by which structure?",
    options: [
      "Cilia",
      "Microvilli",
      "Stereocilia",
      "Flagellum"
    ],
    answer: 3,
    explanation: "In the human body, the flagellum is uniquely found in spermatozoa. It exhibits a 9+2 axoneme arrangement with dynein arms powered by ATP from the mitochondrial sheath.",
    category: "Embryology & Development",
    highYieldPearl: "Axoneme structure: 9 doublets + 2 central microtubules. Flagella provide motility; microvilli and stereocilia are actin-based non-motile projections.",
    difficulty: "Standard"
  },
  {
    id: 25,
    question: "Where does fertilization normally occur?",
    options: [
      "Uterus",
      "Cervix",
      "Ampullary region of the uterine tube",
      "Ovary"
    ],
    answer: 2,
    explanation: "Fertilization normally takes place in the ampullary region of the uterine (fallopian) tube, which is the widest and longest section of the oviduct.",
    category: "Embryology & Development",
    highYieldPearl: "Fertilization site: Ampulla of uterine tube; Implantation site: Superior posterior/anterior wall of uterine body.",
    difficulty: "Critical"
  },
  {
    id: 26,
    question: "What is the normal site of implantation?",
    options: [
      "Fallopian tube",
      "Ovary",
      "Anterior or posterior wall of body of uterus",
      "Cervix"
    ],
    answer: 2,
    explanation: "The normal physiological site of blastocyst implantation is the endometrium of the anterior or posterior wall of the body of the uterus near the fundus.",
    category: "Embryology & Development",
    highYieldPearl: "Implantation occurs ~6-7 days after fertilization (completed by day 11-12) during the secretory phase of the menstrual cycle.",
    difficulty: "Standard"
  },
  {
    id: 27,
    question: "What is the time required for a spermatogonium to develop into a mature spermatozoon?",
    options: [
      "24 days",
      "74 days",
      "120 days",
      "365 days"
    ],
    answer: 1,
    explanation: "Human spermatogenesis takes approximately 64 to 74 days from spermatogonium to mature spermatozoon, plus an additional 12–14 days for maturation in the epididymis.",
    category: "Embryology & Development",
    highYieldPearl: "Total spermatogenesis cycle is ~74 days. In contrast, oogenesis begins in fetal life and pauses in prophase I until puberty.",
    difficulty: "High-Yield"
  },
  {
    id: 28,
    question: "Which hormone is produced by the placenta?",
    options: [
      "Insulin",
      "Thyroxine",
      "Human chorionic gonadotropin (hCG)",
      "Adrenaline"
    ],
    answer: 2,
    explanation: "Syncytiotrophoblast of the placenta synthesizes hCG (detectable in blood/urine in early pregnancy to maintain corpus luteum), human placental lactogen (hPL), estrogen, and progesterone.",
    category: "Embryology & Development",
    highYieldPearl: "hCG is secreted by syncytiotrophoblast; it maintains corpus luteum progesterone secretion during the first 8–10 weeks of pregnancy.",
    difficulty: "Standard"
  },
  {
    id: 29,
    question: "The notochord gives rise to which structure?",
    options: [
      "Vertebral body",
      "Nucleus pulposus of intervertebral disc",
      "Spinal cord",
      "Ribs"
    ],
    answer: 1,
    explanation: "The embryonic notochord induces neural tube formation and mostly regresses; its persistent adult remnant is the gelatinous nucleus pulposus of each intervertebral disc.",
    category: "Embryology & Development",
    highYieldPearl: "Remnant of notochord = Nucleus pulposus (and apical ligament of dens). Annulus fibrosus arises from mesenchyme.",
    difficulty: "Critical"
  },
  {
    id: 30,
    question: "The male gamete is called:",
    options: [
      "Oocyte",
      "Spermatozoon",
      "Spermatid",
      "Spermatogonium"
    ],
    answer: 1,
    explanation: "The mature haploid male gamete capable of fertilizing the ovum is the spermatozoon (or sperm).",
    category: "Embryology & Development",
    highYieldPearl: "Gametogenesis: Male gamete = Spermatozoon (haploid 23,X or 23,Y); Female gamete = Secondary oocyte/ovum (haploid 23,X).",
    difficulty: "Standard"
  },
  {
    id: 31,
    question: "The fetal portion of the placenta is formed by:",
    options: [
      "Decidua basalis",
      "Chorion frondosum",
      "Amnion",
      "Yolk sac"
    ],
    answer: 1,
    explanation: "The placenta consists of two portions: the fetal portion derived from the chorion frondosum (villous chorion) and the maternal portion derived from the decidua basalis.",
    category: "Embryology & Development",
    highYieldPearl: "Fetal placenta = Chorion frondosum; Maternal placenta = Decidua basalis.",
    difficulty: "Critical"
  },
  {
    id: 32,
    question: "The paramesonephric ducts develop into which structure?",
    options: [
      "Epididymis and vas deferens",
      "Uterine tube and uterus",
      "Seminal vesicles",
      "Prostate gland"
    ],
    answer: 1,
    explanation: "Paramesonephric (Müllerian) ducts develop into the female internal reproductive tract: fallopian (uterine) tubes, uterus, and the upper third of the vagina.",
    category: "Embryology & Development",
    highYieldPearl: "Paramesonephric (Müllerian) -> Uterine tubes, uterus, upper vagina. Mesonephric (Wolffian) -> SEED: Seminal vesicles, Epididymis, Ejaculatory duct, Ductus deferens.",
    difficulty: "Critical"
  },
  {
    id: 33,
    question: "Which antibody crosses the placenta?",
    options: [
      "Immunoglobulin A",
      "Immunoglobulin M",
      "Immunoglobulin G",
      "Immunoglobulin E"
    ],
    answer: 2,
    explanation: "Immunoglobulin G (IgG) is the only antibody class that crosses the placental syncytiotrophoblast via neonatal Fc receptors (FcRn), imparting passive immunity to the fetus.",
    category: "Embryology & Development",
    highYieldPearl: "Only IgG crosses the placenta (IgG Crosses). IgA is in breast milk/colostrum; IgM indicates acute congenital fetal infection.",
    difficulty: "High-Yield"
  },
  {
    id: 34,
    question: "The primitive germ cells first appear in the:",
    options: [
      "Yolk sac",
      "Epiblast",
      "Hypoblast",
      "Amnion"
    ],
    answer: 1,
    explanation: "Primordial germ cells (PGCs) are first specified in the epiblast during the 2nd week, migrate to the wall of the yolk sac near the allantois in week 4, and then migrate to the developing genital ridges by week 5–6.",
    category: "Embryology & Development",
    highYieldPearl: "Origin of PGCs: Epiblast (2nd week) -> yolk sac wall (4th week) -> gonadal ridge (5-6th week).",
    difficulty: "High-Yield"
  },
  {
    id: 35,
    question: "Which of the following is a derivative of the neural crest?",
    options: [
      "Liver",
      "Kidney",
      "Melanocytes",
      "Thyroid follicles"
    ],
    answer: 2,
    explanation: "Neural crest derivatives include melanocytes, dorsal root ganglia, sympathetic chain ganglia, Schwann cells, adrenal chromaffin cells, cranial bones/cartilage, and C-cells of thyroid.",
    category: "Embryology & Development",
    highYieldPearl: "Mnemonic MOTR PASS: Melanocytes, Odontoblasts, Truncus arteriosus septum, Root ganglia (sensory/autonomic), Pia/Arachnoid, Adrenal medulla, Schwann cells.",
    difficulty: "Critical"
  },
  {
    id: 36,
    question: "How many umbilical arteries are present in the umbilical cord?",
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    answer: 1,
    explanation: "A normal umbilical cord contains two umbilical arteries (carrying deoxygenated blood from fetus to placenta) and one umbilical vein (carrying oxygenated blood from placenta to fetus).",
    category: "Embryology & Development",
    highYieldPearl: "Umbilical cord vessels: 2 Arteries (deoxygenated), 1 Vein (oxygenated) surrounded by Wharton's jelly.",
    difficulty: "Standard"
  },
  {
    id: 37,
    question: "What is Wharton's jelly?",
    options: [
      "A hormone produced by the placenta",
      "Embryonic connective tissue in the umbilical cord",
      "A part of the amniotic fluid",
      "A type of muscle tissue"
    ],
    answer: 1,
    explanation: "Wharton's jelly is gelatinous embryonic mucous connective tissue rich in hyaluronic acid and chondroitin sulfate that cushions and prevents compression of vessels inside the umbilical cord.",
    category: "Embryology & Development",
    highYieldPearl: "Wharton's jelly = Mucous connective tissue of umbilical cord; derived from extraembryonic mesoderm.",
    difficulty: "Standard"
  },
  {
    id: 38,
    question: "Meiosis in oogenesis is started:",
    options: [
      "Before birth",
      "At puberty",
      "During prenatal life and at fertilization",
      "After menopause"
    ],
    answer: 2,
    explanation: "Oogenesis begins during fetal life (prenatal meiosis I arrest in prophase I / dictyotene stage until ovulation), and meiosis II is only completed upon fertilization by a sperm.",
    category: "Embryology & Development",
    highYieldPearl: "Meiosis I arrest: Prophase I (dictyotene) until ovulation. Meiosis II arrest: Metaphase II until fertilization.",
    difficulty: "Critical"
  },
  {
    id: 39,
    question: "The adrenal medulla is derived from which germ layer / origin?",
    options: [
      "Endoderm",
      "Mesoderm",
      "Ectoderm (surface)",
      "Neural crest"
    ],
    answer: 3,
    explanation: "The adrenal (suprarenal) cortex develops from the coelomic mesoderm, while the adrenal medulla develops from neural crest ectoderm (neuroectoderm).",
    category: "Embryology & Development",
    highYieldPearl: "Adrenal Cortex = Mesoderm; Adrenal Medulla (chromaffin cells) = Neural crest cells.",
    difficulty: "Critical"
  },
  {
    id: 40,
    question: "Transverse colon is derived embryologically from?",
    options: [
      "Foregut, Midgut",
      "Midgut, Hindgut",
      "Foregut, Hindgut",
      "Cloaca"
    ],
    answer: 1,
    explanation: "The transverse colon has dual embryological origins: the proximal two-thirds develops from the midgut (supplied by superior mesenteric artery), and the distal one-third develops from the hindgut (supplied by inferior mesenteric artery).",
    category: "Embryology & Development",
    highYieldPearl: "Junction between proximal 2/3 and distal 1/3 of transverse colon marks midgut/hindgut boundary and Cannon's point watershed area.",
    difficulty: "Critical"
  },
  {
    id: 41,
    question: "The thalamus processes all sensory information from the body EXCEPT:",
    options: [
      "Vision",
      "Smell",
      "Hearing",
      "Touch"
    ],
    answer: 1,
    explanation: "Olfaction (smell) is the only primary sensory modality whose pathways project directly to the primary olfactory cortex and amygdala without an obligatory initial relay in the thalamus.",
    category: "Neuroanatomy",
    highYieldPearl: "All senses relay in thalamic nuclei (LGB=vision, MGB=audition, VPL/VPM=somatosensory) except Olfaction.",
    difficulty: "Critical"
  },
  {
    id: 42,
    question: "Which of the following areas of the brain is devoid of the Blood-Brain Barrier?",
    options: [
      "Cerebral cortex",
      "Cerebellum",
      "Medulla oblongata",
      "Pineal gland"
    ],
    answer: 3,
    explanation: "Circumventricular organs, including the pineal gland, neurohypophysis, area postrema, and median eminence, lack a blood-brain barrier to sample systemic blood chemicals and secrete neurohormones.",
    category: "Neuroanatomy",
    highYieldPearl: "Circumventricular organs without BBB: Area postrema (chemoreceptor trigger zone for vomiting), Pineal gland, Posterior pituitary, Subfornical organ.",
    difficulty: "High-Yield"
  },
  {
    id: 43,
    question: "Which of the following is a contraindication for performing a lumbar puncture?",
    options: [
      "Papilloedema",
      "Mild headache",
      "Fever",
      "Normal CT scan"
    ],
    answer: 0,
    explanation: "Papilloedema signifies raised intracranial pressure (ICP). Performing a lumbar puncture in raised ICP may cause a sudden pressure gradient resulting in fatal cerebral or tonsillar herniation through the foramen magnum.",
    category: "Neuroanatomy",
    highYieldPearl: "Fundus examination for papilloedema is mandatory before lumbar puncture to rule out space-occupying lesions causing raised ICP.",
    difficulty: "Critical"
  },
  {
    id: 44,
    question: "Which of the following is an UNPAIRED dural venous sinus?",
    options: [
      "Cavernous sinus",
      "Superior sagittal sinus",
      "Transverse sinus",
      "Sigmoid sinus"
    ],
    answer: 1,
    explanation: "The Superior sagittal sinus, Inferior sagittal sinus, Straight sinus, and Occipital sinus are midline unpaired dural venous sinuses; cavernous, transverse, sigmoid, and superior/inferior petrosal sinuses are paired.",
    category: "Neuroanatomy",
    highYieldPearl: "Unpaired sinuses: Superior sagittal, Inferior sagittal, Straight, Occipital, Intercavernous.",
    difficulty: "High-Yield"
  },
  {
    id: 45,
    question: "The subarachnoid space ends below at the lower border of which vertebra?",
    options: [
      "First lumbar vertebra (L1)",
      "Third lumbar vertebra (L3)",
      "Second sacral vertebra (S2)",
      "First coccygeal vertebra"
    ],
    answer: 2,
    explanation: "The dural sac and the containing subarachnoid space terminate at the lower border of the second sacral vertebra (S2), forming the lumbar cistern between L1 and S2.",
    category: "Neuroanatomy",
    highYieldPearl: "Spinal cord ends at L1/L2 in adults; Dural sac/subarachnoid space ends at S2; Filum terminale externum attaches to coccyx.",
    difficulty: "Critical"
  },
  {
    id: 46,
    question: "In children, the spinal cord extends down to which vertebral level?",
    options: [
      "L1",
      "L2",
      "L3",
      "S2"
    ],
    answer: 2,
    explanation: "In newborns and young children, the conus medullaris of the spinal cord terminates at the lower border of L3, ascending to L1–L2 by adulthood due to differential vertebral column growth.",
    category: "Neuroanatomy",
    highYieldPearl: "Conus medullaris termination: Embryo (entire canal) -> Newborn (L3) -> Adult (L1-L2 border). Lumbar puncture is done at L4-L5.",
    difficulty: "Critical"
  },
  {
    id: 47,
    question: "What is the average length of the spinal cord in an adult male?",
    options: [
      "42 cm",
      "18 cm",
      "50 cm",
      "45 cm"
    ],
    answer: 3,
    explanation: "The average length of the spinal cord is approximately 45 cm in an adult male and 42–43 cm in an adult female, weighing about 30 grams.",
    category: "Neuroanatomy",
    highYieldPearl: "Adult spinal cord length: ~45 cm (male), ~43 cm (female); extends from foramen magnum to L1/L2 disk.",
    difficulty: "Standard"
  },
  {
    id: 48,
    question: "How many pairs of spinal nerves arise from the spinal cord?",
    options: [
      "12 pairs",
      "30 pairs",
      "31 pairs",
      "33 pairs"
    ],
    answer: 2,
    explanation: "There are 31 pairs of spinal nerves: 8 cervical (C1-C8), 12 thoracic (T1-T12), 5 lumbar (L1-L5), 5 sacral (S1-S5), and 1 coccygeal (Co1).",
    category: "Neuroanatomy",
    highYieldPearl: "31 pairs: 8 Cervical, 12 Thoracic, 5 Lumbar, 5 Sacral, 1 Coccygeal. Note: 8 cervical nerves vs 7 cervical vertebrae.",
    difficulty: "Standard"
  },
  {
    id: 49,
    question: "From which pharyngeal pouches do the superior and inferior parathyroid glands develop?",
    options: [
      "Superior: 3rd pouch; Inferior: 4th pouch",
      "Superior: 4th pouch; Inferior: 3rd pouch",
      "Both develop from the 3rd pouch",
      "Both develop from the 4th pouch"
    ],
    answer: 1,
    explanation: "The inferior parathyroid glands develop from the 3rd pharyngeal pouch (along with thymus) and migrate farther downward; the superior parathyroid glands develop from the 4th pharyngeal pouch.",
    category: "Embryology & Development",
    highYieldPearl: "Counter-intuitive embryology: Inferior parathyroid comes from 3rd pouch; Superior parathyroid comes from 4th pouch.",
    difficulty: "Critical"
  },
  {
    id: 50,
    question: "Which nerves supply the sphincter pupillae and dilator pupillae muscles of the iris?",
    options: [
      "Sphincter: Sympathetic; Dilator: Parasympathetic",
      "Sphincter: Parasympathetic; Dilator: Sympathetic",
      "Both are supplied by the parasympathetic nervous system",
      "Both are supplied by the sympathetic nervous system"
    ],
    answer: 1,
    explanation: "Sphincter pupillae (constricts pupil / miosis) is innervated by parasympathetic postganglionic fibers via CN III and ciliary ganglion; dilator pupillae (dilates pupil / mydriasis) is innervated by sympathetic fibers from superior cervical ganglion.",
    category: "Neuroanatomy",
    highYieldPearl: "Pupillary light reflex: Afferent = CN II (Optic), Efferent = CN III (Oculomotor parasympathetic to sphincter pupillae).",
    difficulty: "Critical"
  }
];
