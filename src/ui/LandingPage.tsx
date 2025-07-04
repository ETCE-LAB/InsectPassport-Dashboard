import {Flex, Image, TextInput, Title, Text, Button, BackgroundImage, Overlay, AspectRatio} from "@mantine/core";
import landingpage1 from "../util/landingpage1.png"
import landingpage2 from "../util/landingpage2.png"
import landingpage3 from "../util/landingpage3.png"
import landingpage4 from "../util/landingpage4.png"
import heroimg from "../util/bugs-you-can-eat-00-intro-722x406.jpg"
import FolderUploader from "./FolderUploader";


export const LandingPage = () => {


    return <>

        <Flex direction={"row"} justify={"center"} pb={"15px"}
        >

            <AspectRatio ratio={16 / 9} style={{ position: "relative" }} w={"100%"}>
                {/* Background image at zIndex=0 */}
                <BackgroundImage
                    src={heroimg}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 0,
                    }}
                />

                {/* Dark overlay at zIndex=1 */}
                <Overlay
                    color="#000"
                    opacity={0.85}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                    }}
                />

                {/* Text/content container at zIndex=2 */}
                <Flex
                    direction="column"
                    align="center"
                    justify={"center"}
                    gap="15px"
                    style={{
                        position: "relative",
                        zIndex: 2,
                        padding: "1rem",
                        maxWidth: "1000px",
                        margin: "0 auto",
                    }}

                >
                    <Title c={"white"} order={2}>Imported, Verified, and Trusted Insect Meal</Title>
                    <Text c={"white"}>
                        Ensuring sustainability throughout the food supply chain and compliance
                        with European regulations...
                    </Text>
                    <Text c={"white"}>
                        Enter the product batch id or scan the QR code to trace its journey and...
                    </Text>
                    <Flex direction="row" gap="15px">
                        <TextInput placeholder="Enter Batch Number" />
                        <Button>Search</Button>
                    </Flex>
                    <Button>Scan Qr-Code</Button>
                    <FolderUploader />
                </Flex>
            </AspectRatio>

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

                    <Title order={2}>Supply chain</Title>

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
