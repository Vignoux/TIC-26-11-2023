import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [id, setId] = useState(uuidv4());
    const [nome, setNome] = useState(dataEdit.nome || "")
    const [prioridade, setPrioridade] = useState(dataEdit.prioridade || "")
    const [qtde, setQtde] = useState(dataEdit.qtde || "")
    const [categoria, setCategoria] = useState(dataEdit.categoria || "")
    const [dataCadastro, setDataCadastro] = useState(dataEdit.dataCadastro || "")
    const [validade, setValidade] = useState(dataEdit.validade || "")
    const [local, setLocal] = useState(dataEdit.local || "")  


    const handleSave = () => {
        if (!id || !nome || !prioridade || !qtde || !categoria || !dataCadastro || !validade || !local) return;
        if (Object.keys(dataEdit).length){
            data[dataEdit.index] = { id, nome, prioridade, qtde, categoria, dataCadastro, validade, local }
        }
   

    const newDataArray = !Object.keys(dataEdit).length
        ?[...(data ? data : []), { id, nome, prioridade, qtde, categoria, dataCadastro, validade, local }]
        :[...(data ? data : [])]
        
        localStorage.setItem("cad_produto", JSON.stringify(newDataArray))

        setData(newDataArray)
        
        onClose();
    }
        
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Produtos</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Box>     
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}    
                                />
                                <FormLabel>Prioridade</FormLabel>
                                <Input
                                    type="number"
                                    value={prioridade}
                                    onChange={(e) => setPrioridade(e.target.value)}
                                />
                                <FormLabel>Quantidade</FormLabel>
                                <Input
                                    type="number"
                                    value={qtde}
                                    onChange={(e) => setQtde(e.target.value)}
                                />
                                <FormLabel>Categoria</FormLabel>
                                <Input
                                    type="text"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                />
                                <FormLabel>Data de Cadastro</FormLabel>
                                <Input
                                    type="date"
                                    value={dataCadastro}
                                    onChange={(e) => setDataCadastro(e.target.value)}
                                />
                                <FormLabel>Data de Validade</FormLabel>
                                <Input
                                    type="date"
                                    value={validade}
                                    onChange={(e) => setValidade(e.target.value)}
                                />
                                <FormLabel>Local</FormLabel>
                                <Input
                                    type="text"
                                    value={local}
                                    onChange={(e) => setLocal(e.target.value)}
                                />
                            </Box>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent="start">
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            SALVAR
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            CANCELAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    );
};

export default ModalComp;