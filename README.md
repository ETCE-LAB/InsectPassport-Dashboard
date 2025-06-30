# InsectPassport-Dashboard
This case study implementation provides initial validation of the proposed Digital Product Passport (DPP) architecture for insect meal, confirming its relevance and practical applicability through its core categories and information flows.

## Live Demo
Visit the PoC here: https://etce-lab.github.io/InsectPassport-Dashboard/

## For Developers
### Getting started
The setup and deployment guide for a JavaScript project (React app):

1) git clone https://github.com/ETCE-LAB/InsectPassport-Dashboard.git            
2) cd InsectPassport-Dashboard                
3) npm install                
##### Troubleshooting
- - If npm install fails, it may be due to an outdated or missing version of Node.js or npm
  - Make sure you have the latest LTS version of Node.js and npm installed
  - You can download it here https://nodejs.org
  - After installing or updating, run step 3 again
4) npm start    # Starts the development server (usually at http://localhost:3000)

### Deployment
#### Deploy to GitHub Pages
1) npm run deploy

#### Deploy to Own Server
1) npm install          # if you haven’t yet
2) npm run build:local  # generates a relative-path build
3) npm run serve        # serves it at http://localhost:3000

# Repository Structure
## /figures/ 
All the diagrams cited in the paper:
- 'data_model_DPP_insect_meal_complete.pdf' - High-level overview of insect meal's digital product passport (DPP), showcasing the core information categories and related hierarchical levels.
- 'data_model_DPP_insect_meal.pdf' - Shorter version of the DPP overview suitable for the paper size constraints.
- 'domain_model_DPP_insect_meal.pdf' - High-level conceptual model of key entities and their relationships.
- 'class_diagram_DPP_insect_meal.pdf' - UML class diagram representing the DPP architecture, showing relationships between all information categories.
- 'impact_barchart_LCA_inerpretation_phase.png' - Environmental impacts associated with 100g of protein from BSF Cycle’s BSF product, categorised by mid-point impact.
- 'impact_pie_charts_of_individual_lifecycle_stages.png' - Environmental impact of 100g of protein from BSF Cycle's BSF product across different life cycle stages.
- 'system_boundary_LCA.png' - System boundary of the LCA for DPP.

## /UML-models/
Editable versions of the system architecture diagrams (available in '/figure/' folder) created using draw.io (https://drawio.app/):
- 'class_diagram_DPP_insect_meal.drawio' - UML class diagram representing the proposed DPP for insect meal
- 'domain_model_DPP_insect_meal.drawio' - High-level domain model showing conceptual relationships in the DPP.

## /case-study/
Materials related to the case study scenario in the paper:
- 'bill_of_landing.pdf' - Receipt for proof of shipment related to the Trade & Logistics Compliance regulation
- 'certificate_of_origin.pdf' - Receipt for proof of product's origin related to the Trade & Logistics Compliance regulation
- 'Lab_Test_Report_AAandDigestibility.pdf' - Proof of laboratory test on products related to the Hygiene & Traceability Compliance regulation
- 'veterinary_health_certificate.pdf' - Proof of checking the product's health state related to the Processing Compliance regulation
- 'supply_chain_illustration.pdf' - Illustration of what the supply chain looks like

## /demo/
