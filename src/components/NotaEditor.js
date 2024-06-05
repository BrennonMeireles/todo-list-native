import { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { atulizarNota, removerNota, adicionarNota } from '../services/Notas'
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
    return (

    )
}
