import Head from "next/head"

const users = ['Victor Emanuel de Lima Velozo', 'Peter Adami Candido', 'Leandro', 'Jean']

export default function CreateTicket(){
    return <div className="p-4 flex flex-col flex-1">
        <Head>
            <title>Criar novo Ticket</title>
        </Head>
        <h2 className="text-3xl font-bold text-base-dark">Criar novo ticket</h2>
        <form className="flex flex-row gap-1 flex-1">
            <div className="bg-background-light rounded-lg p-4 text-base-dark flex-1 flex flex-col gap-2">
                <div>
                    <label htmlFor="user" className="font-bold text-right">
                        Nome do usuário:
                    </label>
                    <input type="text" id='user' list='user-list' className="w-full table-cell px-2 py-1 rounded-sm border-base-light border text-base-light"/>
                    <datalist id='user-list' className="border-1 border-blue">
                        {users.map(user => (<option key={user} value={user} className="bg-red-400"/>))}
                    </datalist>
                </div>
                <div>
                    <label htmlFor="user" className="font-bold text-right">
                        Email:
                    </label>
                    <input type="text" id='email' className="w-full table-cell px-2 py-1 rounded-sm border-base-light border text-base-light"/>
                </div>
                <div>
                    <label htmlFor="user" className="font-bold text-right">
                        Telefone:
                    </label>
                    <input type="text" id='email' className="w-full table-cell px-2 py-1 rounded-sm border-base-light border text-base-light"/>
                </div>
                <div>
                    <label htmlFor="user" className="font-bold text-right">
                        Unidade:
                    </label>
                    <input type="text" id='email' className="w-full table-cell px-2 py-1 rounded-sm border-base-light border text-base-light"/>
                </div>
                <div>
                    <label htmlFor="user" className="font-bold text-right">
                        Categoria:
                    </label>
                    <select id='category' className="w-full table-cell px-2 py-1 rounded-sm border-base-light border text-base-light">
                        <option value="value-1" className="bg-red-400">Value 1</option>
                    </select>
                </div>
            </div>
            <div className="flex-1"></div>
        </form>
    </div>
}