import { DateTime } from 'luxon'

function Days({ list, onChange }) {
    const date = DateTime.now()
    const currentDay = date.setLocale(navigator.language).toFormat('cccc')
    const indexCurrentDay = list.indexOf(currentDay)

    const daysList = list.slice(0, 5).map((day, index) => {
        return (
            <a key={ index } href="#" onClick={ (e) => { e.preventDefault(); onChange(index); } } style={{ fontWeight: index === 0 ? 'bold' : 'normal' }}>
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