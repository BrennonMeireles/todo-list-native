import { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { atualizarNota, removerNota, adicionarNota } from '../services/Notas'
import Picker from "react-native-picker";

export default function NotaEditor({ showNotas, notaSel, setNotaSel }) {
    const [categoria, setCategoria] = useState('Pessoal')
    const [titulo, setTitulo] = useState('')
    const [texto, setTexto] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [atualizar, setAtualizar] = useState(false)

    async function salvarNota() {
        const nota = {
            titulo: titulo,
            categoria: categoria,
            texto: setTexto
        }
        await adicionarNota(nota)
        showNotas()
        limparModal()
    }

    async function alterarNota() {
        const nota = {
            id: notaSel.id,
            titulo: titulo,
            categoria: categoria,
            texto: texto
        }
        await atualizarNota(nota);
        showNotas();
        limparModal();
    }

    async function excluirNota() {
        await removerNota(notaSel.id)
        showNotas();
        limpaeModal();
    }

    function preencheModal() {
        setTitulo(notaSel.titulo)
        setCategoria(notaSel.categoria)
        setTexto(notaSel.texto)
    }

    function limpaeModal() {
        setTitulo('')
        setCategoria('Pessoal')
        setTexto('')
        setNotaSel({})
        setModalVisible(false)
    }

    useEffect(() => {
        if (notaSel.id) {
            preencheModal()
            setAtualizar(true)
            setModalVisible(true)
        }
        else {
            preencheModal(false)
        }
    }, [notaSel])

    // elemento 
    return (
        <>
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(false) }}>
                <View style={estilos.centralizarModal}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={estilos.modal}>
                            <Text style={estilos.modalTitulo}>Criar nota</Text>
                            <Text style={estilos.modal.modalSubtitulo}>Título da Nota</Text>
                            <TextInput style={estilos.modalInput} onChangeText={value => setTitulo(value)} placeholder="Digite o título" value={titulo} />

                            <Text style={estilos.modalSubtitulo}>Categoria</Text>
                            <View style={estilos.modalPicker}>
                                <Picker selectedValue={categoria} onValueChange={(itemValue) => setCategoria(itemValue)}>
                                    <Picker.Item Label="Pessoal" value="Pessoal" />
                                    <Picker.Item Label="Trabalho" value="Trabalho" />
                                    <Picker.Item Label="Outros" value="Outros" />
                                </Picker>
                            </View>
                        </View>
                    </ScrollView>

                    <Text style={estilos.modalSubtitulo}>Conteudo da Nota</Text>

                    <TextInput style={estilos.modalInput} multiline={true} numberOfLines={3}
                        onChange={novoTexto => setTexto(novoTexto)} placeholder="Digite aqui a sua nota" value={texto} />

                    <View style={estilos.modalBotoes}>
                        <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => atualizar ? alterarNota() : salvarNota}>
                            <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                        </TouchableOpacity>

                        {
                            atualizar && (
                                <TouchableOpacity style={estilos.modalBotaoDeletar} onPress={() => { excluirNota }}>
                                    <Text style={estilos.modalBotaoTexto}>Excluir</Text>
                                </TouchableOpacity>

                            )
                        }

                        <TouchableOpacity style={estilos.modalBotaoCancelar} onPress={() => { limparModal() }}>
                            <Text style={estilos.modalBotaoTexto}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity onPress={() => { setModalVisible(true) }} style={estilos.exibirModal}>
                <Text style={estilos.exibirModalTexto}>+</Text>
            </TouchableOpacity>
        </>
    )

}

const estilos = StyleSheet.create({
    centralizarModal: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    modal: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 15,
        marginTop: 8,
        marginHorizontal: 15,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 10,
    },
    modalTitulo: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
    },
    modalSubTitulo: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '600',
    },

    modalInput: {
        fontSize: 18,
        marginBottom: 12,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#ff9a94',
    },

    modalPicker: {
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 12,
    },

    modalBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    modalBotaoTexto: {
        color: '#fff',
    },

    modalBotaoSalvar: {
        backgroundColor: '#2ea805',
        borderRadius: 5,
        padding: 8,
        width: 80,
        alignItems: 'center',
    },

    modalBotaoDeletar: {
        backgroundColor: '#d62a18',
        borderRadius: 5,
        padding: 8,
        width: 80,
        alignItems: 'center',
    },

    modalBotaoCancelar: {
        backgroundColor: '#057fa8',
        borderRadius: 5,
        padding: 8,
        width: 80,
        alignItems: 'center',
    },

    exibirModal: {
        backgroundColor: "#54ba32",
        justifyContent: "center",
        height: 64,
        width: 64,
        margin: 16,
        alignItems: "center",
        borderRadius: 9999,
        position: "absolute",
        bottom: 0,
        right: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

    exibirModalTexto: {
        fontSize: 32,
        lineHeight: 40,
        color: "#FFFFFF",
    }

});
