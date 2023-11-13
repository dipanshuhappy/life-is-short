import { Button, Input, InputGroup, InputLeftAddon, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useHoldIc } from "@hold-ic/react"
import { md5 } from 'js-md5';

function WalletButton() {
    const { holdIC, isConnected } = useHoldIc()
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log({ isConnected })
    const connectActor = async () => {
        const print = await holdIC?.getPrinicpal()
        console.log({ print })
        // backend_backend.insert(BigInt(1234), {
        //     link: "https://www.google.com",
        //     user: print ?? new principalIdFromHex("")
        // })
        const actor: any = await holdIC.getActor('backend_backend')
        console.log({ actor })
        const a = await actor?.getLink(BigInt(1234));
        console.log({ a })
    }
    const [link, setLink] = useState("")
    const [longLink, setLongLink] = useState("")
    const shorten = async () => {
        const actor: any = await holdIC.getActor('backend_backend')
        const hasher = md5.create()
        hasher.update(link)
        console.log({ hasher })
        const prinicple = await (window as any).ic.plug.getPrincipal();
        const key = BigInt(`0x${hasher.hex()}`);
        console.log({ key })
        const result = await actor?.insert(key, {
            link: longLink,
            user: prinicple
        })
        alert("Done url shorten")

        console.log({ result })

    }
    return (
        <>{
            isConnected ? (
                <>
                    <Button onClick={() => {
                        console.log(holdIC.wallet, "wallllett")

                        holdIC.disconnect(() => console.log("disconnet"))
                        window.location.reload()
                    }}>
                        Disconnect
                    </Button>
                    <Button onClick={async () => {
                        console.log(holdIC.wallet, "wallllett")
                        await connectActor()
                    }}>
                        Get value
                    </Button>
                </>
            ) : (
                <Button onClick={() => {
                    console.log(holdIC.wallet, "wallllett")
                    onOpen()
                }}>
                    Wallet Connect
                </Button>
            )
        }
            {
                isConnected ? <VStack>
                    <Input size={'lg'} value={longLink} onChange={(e) => setLongLink(e.target.value)} placeholder='Enter Long Link'>

                    </Input>
                    <InputGroup size='sm'>
                        <InputLeftAddon children='https://lifeisshort.ton/' />
                        <Input placeholder='my short link' value={link} onChange={(e) => setLink(e.target.value)} />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={shorten}>
                                Shorten!
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                </VStack> : <></>
            }


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Button onClick={
                            async () => {
                                await holdIC.connect("Plug", () => {
                                    console.log("connected")
                                    alert("Done")
                                    onClose()
                                })
                            }
                        }>
                            Plug Wallet Connect
                        </Button>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default WalletButton;