export default function EmpresaLogin() {

    return (
    <form className="flex flex-col">

        <label>Nome da empresa</label>
        <input type="text" placeholder="Nome da empresa" className="loginForm"/>

        <label className="mt-5">CNPJ</label>
        <input type="number" placeholder="CNPJ" className="loginForm"/>

        <label className="mt-5">Email do fundador</label>
        <input type="email" placeholder="Email do fundador" className="loginForm"/>

        <label className="mt-5">Senha</label>
        <input type="password" placeholder="Senha" className="loginForm"/>

        <button className="botaoEntrar">
        Cadastrar empresa
        </button>

    </form>
    )
}