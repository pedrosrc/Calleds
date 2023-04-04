import './title.css'
export default function Title({children, title}:any){
    return(
        <div className='title'>
            {children}
            <h1>{title}</h1>
        </div>
    )
}