import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

type IProps = React.HTMLProps<HTMLButtonElement> & {
    loading?: boolean
    type?: 'button' | 'submit' | 'reset' | undefined
    clearRelative?: boolean
    buttonRef?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<IProps> = ({
    children,
    disabled,
    loading,
    className,
    clearRelative,
    buttonRef,
    type = 'button',
    ...rest
}) => {
    return (
        <button
            type={type}
            ref={buttonRef}
            disabled={loading || disabled}
            className={`${!clearRelative ? 'relative ' : ''}${className} ${
                loading ? 'disabled:opacity-40' : ''
            } `}
            {...rest}
        >
            <span className={loading ? 'opacity-0' : 'opacity-100'}> {children} </span>{' '}
            {loading && (
                <div className="absolute w-full pt-2 top-0 left-0">
                    <AiOutlineLoading className="mx-auto text-lg animate-spin" />{' '}
                </div>
            )}
        </button>
    )
}
export default Button
