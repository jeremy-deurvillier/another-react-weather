import { DateTime, Info } from 'luxon'
import './Days.css'

function Days({ onChange }) {
    const weekdays = Info.weekdays('long', { locale: navigator.language })
    const date = DateTime.now()
    const currentDay = date.setLocale(navigator.language).toFormat('cccc')
    const indexCurrentDay = weekdays.indexOf(currentDay)
    const days = weekdays.slice(indexCurrentDay).concat(
        weekdays.slice(0, indexCurrentDay)
    )

    function handleClick(e) {
        e.preventDefault()

        onChange(e.target.dataset.index)

        document.querySelector('.on-active').classList.remove('on-active')
        e.target.classList.add('on-active')
    }

    const daysList = days.slice(0, 3).map((day, index) => {
        let className = index === 0 ? 'on-active' : ''
        return (
            <a key={ index } href="#" onClick={ handleClick } data-index={ index } className={ className } >
                { day }
            </a>
        )
    })

    return (
        <div className="card-action">
            { daysList }
        </div>
    )
}

export default Days