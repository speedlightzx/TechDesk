export default function FuncionarioLogin() {
    return (
        <form className="flex flex-col">

        <label>Email corporativo</label>
        <input type="email" placeholder="Email corporativo" className="loginForm"/>

        <label className="mt-5">Senha</label>
        <input type="password" placeholder="Senha" className="loginForm"/>
        
        <button className="botaoEntrar">
        Fazer login como funcionário
        </button>

        </form>
    )
}