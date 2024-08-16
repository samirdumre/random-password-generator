import {useState, useCallback, useEffect, useRef} from 'react'

function App() {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [specialCharAllowed, setsSpecialCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    //useRef hook
    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(function () {
            let pass = ""
            let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            if (numberAllowed) {
                str += "0123456789"
            }
            if (specialCharAllowed) {
                str += "!@~#$%^&*(){}[]"
            }

            for (let i = 1; i <= length; i++) {
                let char = Math.floor(Math.random() * str.length + 1);
                pass += str.charAt(char);
            }

            setPassword(pass);

        },
        [length, numberAllowed, specialCharAllowed, setPassword])

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select(); // shows selected effect after clicking on the button 'copy'
        passwordRef.current?.setSelectionRange(0, length); // selects password from 0 to length of the password
        window.navigator.clipboard.writeText(password); // copies the value of 'password' to clipboard
        },
        [password])

    useEffect(() => {
            passwordGenerator()
        },
        [length, numberAllowed, specialCharAllowed, passwordGenerator]
    )

    return (
        <>
            <div className={'w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'}>
                <h1 className={'text-white text-center'}>Password Generator</h1>
                <div className={'flex shadow rounded-lg overflow-hidden mb-4'}>
                    <input
                        type={"text"}
                        value={password}
                        className={'outline-none w-full py-1 px-3'}
                        placeholder={"Password"}
                        readOnly={true}
                        ref={passwordRef}
                    />
                    <button
                        onClick={copyPasswordToClipboard}
                        className={'outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '}>Copy
                    </button>

                </div>
                <div className={'flex text-sm gap-x-2'}>
                    <div className={'flex items-center gap-x-1'}>
                        <input
                            type={"range"}
                            min={6}
                            max={100}
                            value={length}
                            className={'cursor-pointer'}
                            onChange={(e) => {
                                setLength(e.target.value)
                            }}
                        />
                        <label>Length: {length}</label>
                    </div>
                    <div className={'flex items-center gap-x-1'}>
                        <input
                            type={'checkbox'}
                            defaultChecked={numberAllowed}
                            id={'numberInput'}
                            onChange={() => {
                                setNumberAllowed((prev) => !prev);
                            }}
                        />
                        <label>Numbers</label>
                    </div>
                    <div className={'flex items-center gap-x-1'}>
                        <input
                            type={'checkbox'}
                            defaultChecked={specialCharAllowed}
                            id={'characterInput'}
                            onChange={() => {
                                setsSpecialCharAllowed((prev) => !prev);
                            }}
                        />
                        <label>Special Characters</label>
                    </div>
                </div>
            </div>
            <footer className={'text-white text-center font-semibold'}>&copy; Samir Dumre</footer>
        </>
    )
}

export default App
