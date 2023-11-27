import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp.jsx";


const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);

  
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(()=>{const db_produto = localStorage.getItem("cad_produto")
    ? JSON.parse(localStorage.getItem("cad_produto"))
    : [];

    setData(db_produto);
  }, [setData])

  const handleRemove = (id) => {
    const newArray = data.filter((item) => item.id !== id);
  
    setData(newArray);
  
    localStorage.setItem("cad_produto", JSON.stringify(newArray));
  };
  

  
  return (
   <Flex
   h="100vh"
   justify="center"
   fontSize="20px"
   fontFamily="poppins">
    <Box maxw={800} w="100%" h="100vh" py={10} px={2}>
      <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
        NOVO CADASTRO
      </Button>

      <Box overflowY="auto" height="100%">
      <Table mt="6">
        <Thead>
          <Tr>
            <Th maxiw={isMobile ? 5 : 100} fontSize="20px">
              Nome
            </Th>
            <Th maxiw={isMobile ? 5 : 100} fontSize="20px">
              Prioridade
            </Th>
            <Th maxiw={isMobile ? 5 : 100} fontSize="20px">
              Quantidade
            </Th>
            <Th maxiw={isMobile ? 5 : 100} fontSize="20px">
              Categoria
            </Th>
            <Th maxiw={isMobile ? 5 : 100} fontSize="20px">
              Data do Cadastro
            </Th>
            <Th maxiw={isMobile ? 5 : 100} fontSize="20px">
              Validade
            </Th>
            <Th maxiw={isMobile ? 5 : 100} fontSize="20px">
              Local de Origem
            </Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(({ id, nome, prioridade, qtde, categoria, dataCadastro, validade, local }, index) => (
            <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
              <Td maxiw={isMobile ? 5 : 100}>{nome}</Td>
              <Td maxiw={isMobile ? 5 : 100}>{prioridade}</Td>
              <Td maxiw={isMobile ? 5 : 100}>{qtde}</Td>
              <Td maxiw={isMobile ? 5 : 100}>{categoria}</Td>
              <Td maxiw={isMobile ? 5 : 100}>{dataCadastro}</Td>
              <Td maxiw={isMobile ? 5 : 100}>{validade}</Td>
              <Td maxiw={isMobile ? 5 : 100}>{local}</Td>
              <Td p={0}>
                <EditIcon
                  fontSize={20}
                  onClick={() => [
                    setDataEdit({ nome, prioridade, qtde, categoria, dataCadastro, validade, local, index }),
                    onOpen(),
                  ]}
                />
              </Td>
              <Td p={0}>
                  <DeleteIcon
                    fontSize={20}
                    onClick={() => [
                      handleRemove(id),
                    ]}
                  /> 
                </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </Box>
    </Box>
    {isOpen && (
      <ModalComp
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        setData={setData}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
      />
    )}
   </Flex>
  );
};
export default App
