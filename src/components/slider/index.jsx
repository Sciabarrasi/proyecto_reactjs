import './styles.css'

const Slider = ({ children }) => {
    return(
        <div className="slider">
            <button type='button' className='previousButton'>&lt;</button>
            <button type='button' className='nextButton'>&gt;</button>
            <div className='sliderContent'>
                {children}
            </div>
        </div>
    )
}

export default Slider