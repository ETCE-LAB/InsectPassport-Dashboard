import {Flex, Image, TextInput, Title, Text, Button} from "@mantine/core";
import landingpage1 from "../util/landingpage1.png"
import landingpage2 from "../util/landingpage2.png"
import landingpage3 from "../util/landingpage3.png"
import landingpage4 from "../util/landingpage4.png"
import FolderUploader from "./FolderUploader";


export const LandingPage = () => {


    return <>

        <Flex direction={"row"} justify={"center"} bg={"darkgrey"} pt={"15px"} pb={"15px"}>
            <Flex w={"1000px"} direction={"column"} align={"center"}  gap={"15px"}>
                <Title order={2}>Imported, Verfied, and Trusted Insect Meal</Title>
                <Text>Ensuring sustainability throughout the food supply chain and compliance with European
                    regulations, our Digital Product Passport aims to enhance acceptability of insect-derived
                    protein sourced from developing countries. This initiative advocates for a sustainable
                    alternative to conventional feed ingredients in the future food system.</Text>
                <Text>Enter the product batch id or scan the QR code to trace its journey and sustainability impact.</Text>
                <Flex direction={"row"} gap={"15px"}>
                    <TextInput placeholder={"Enter Batch Number"}></TextInput>
                    <Button>Search</Button>
                </Flex>
                <Button>Scan Qr-Code</Button>
                <FolderUploader></FolderUploader>
            </Flex>
        </Flex>



        <Flex direction={"row"} pt={"20px"} pb={"20px"} justify={"center"}>
            <Flex w={"1000px"} gap={"30px"} align={"center"}>
                <Flex direction={"column"} align={"center"} gap={"15px"} w={"70%"}>
                    <Title order={2}>Digital Insect Meal Passport</Title>
                    <Text>This Digital Product Passport is designed to enhance transparency, traceability, and
                        sustainability within the insect Industry by ensuring that every step of the insect meal
                        production process is meticulously recorded and readily available. It provides complete
                        transparency regarding the origin, breeding practices, and environmental impact of the
                        insect-derived Protein. While also verifying that European Food Safety Standards are
                        respected and met during production, importation, and processing. Thus, this tool
                        encourages well-informed decision-making while fostering trust and confidence among all
                        stakeholders in the supply chain.</Text>
                </Flex>
                <Flex  w={"30%"} align={"center"} justify={"center"}>
                    <Image src={landingpage1}></Image>
                </Flex>
            </Flex>
        </Flex>

        <Flex direction={"row"} pt={"20px"} pb={"20px"} justify={"center"} bg={"darkgrey"}>
            <Flex w={"1000px"} gap={"30px"} align={"center"}>

                <Flex  w={"30%"} align={"center"} justify={"center"}>
                    <Image src={landingpage2}></Image>
                </Flex>

                <Flex direction={"column"} align={"center"} gap={"15px"} w={"70%"}>
                    <Title order={2}>Insect-based protein meal</Title>
                    <Text>As a sustainable substitute, insect-based protein meals are becoming more popular due to
                        their potential to alleviate environmental challenges, improve nutritional value, and lower
                        production costs. Black soldier fly larvae and yellow mealworms are two species that offer
                        benefits, including minimal greenhouse gas emissions, reduced land footprint, and
                        compatibility with the principles of the circular economy. Moreover, insect meal is rich in vital
                        amino acids, Protein, and healthy fats, making it an excellent nutritional source for animal
                        feed and potential use in human food. It contains essential micronutrients and is highly
                        digestible to support growth, immune function, and nutrient absorption.</Text>
                </Flex>
            </Flex>
        </Flex>

        <Flex direction={"row"} pt={"20px"} pb={"20px"} justify={"center"}>
            <Flex w={"1000px"} gap={"30px"} align={"center"}>
                <Flex direction={"column"} align={"center"} gap={"15px"} w={"70%"}>
                    <Title order={2}>Supply Chain</Title>
                    <Text>With the aid of the insights provided by the digital passport, enhanced traceability and more
                        efficient operations are advantageous to all supply chain participants. Farmers can document
                        and share detailed information about breeding practices and ensure adherence to European
                        Standards, which helps access premium markets and fosters consumer trust. The legitimacy
                        and dependability of the supply chain are increased by suppliers and feed producers being
                        able to update and confirm data on processing, storage, and transportation conditions.
                        Moreover, retailers gain a comprehensive view of the insect meal’s journey, ensuring the
                        quality and safety of the insect meal. Lastly, consumers and animal farmers are empowered
                        to make informed purchasing decisions and support adopting sustainable food options.</Text>
                </Flex>
                <Flex  w={"30%"} align={"center"} justify={"center"}>
                    <Image src={landingpage3}></Image>
                </Flex>
            </Flex>
        </Flex>

        <Flex direction={"row"} pt={"20px"} pb={"20px"} justify={"center"} bg={"darkgrey"}>
            <Flex w={"1000px"} gap={"30px"} align={"center"}>

                <Flex  w={"30%"} align={"center"} justify={"center"}>
                    <Image src={landingpage4}></Image>
                </Flex>

                <Flex direction={"column"} align={"center"} gap={"15px"} w={"70%"}>
                    <Title order={2}>Future prospects</Title>
                    <Text>The concept of this insect meal passport embraces the global push for more ethical and
                        environmentally friendly food production methods. With this initiative, insect-derived protein is
                        promoted, as insect-derived protein has a substantially smaller environmental impact than
                        conventional animal protein sources. Additionally, to encourage scalability of compliance and

                        best practices across different insect industry segments. Along with empowering all parties
                        involved in the insect meal supply chain to make wise decisions that benefit both people and
                        the environment, this creative concept guarantees that the insect industry stays at the
                        forefront of sustainable food systems.</Text>
                </Flex>
            </Flex>
        </Flex>

    </>
}
