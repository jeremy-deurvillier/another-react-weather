import Days from '../days/Days'

function Weather({ city, datas, changeCurrent, changeCity, api }) {

    function handleChange(e) {
        changeCity(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        api()
    }

    return (
        <div className="row">
            <div className="col s12 m6 push-m3">
                <div className="weather card blue-grey darken-1">
                    <div className="card-content white-text">
                        <div className='row'>
                            <form action="post" onSubmit={ handleSubmit } className='col s12 m10 offset-m1 l6 offset-l3 xl4 offset-xl4'>
                                <input value={ city } onChange={ handleChange } className='center-align light-blue-text lighten-5-text' />
                            </form>
                        </div>
                        <span className="card-title">{ city }</span>
                        <p>
                            <img src={ datas.icon } width="128" alt={ datas.text } />
                        </p>
                        <span className="temperature">{ datas.temp_c }°</span>
                        <div className="wind">
                            Vent { datas.wind_kph }km/h ({ datas.wind_degree }°)
                        </div>
                    </div>

                    <Days onChange={ changeCurrent } />
                </div>
            </div>
        </div>
    )
}

export default Weather