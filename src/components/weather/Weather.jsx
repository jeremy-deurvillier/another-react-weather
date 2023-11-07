import Days from '../days/Days'

function Weather({ city, datas, changeCurrent, changeCity }) {
    return (
        <div className="row">
            <div className="col s12 m6 push-m3">
                <div className="weather card blue-grey darken-1">
                    <div className="card-content white-text">
                        <input value={ city } onChange={ e => changeCity(e.target.value) } className='light-blue-text lighten-5-text' />
                        <span className="card-title">{ city }</span>
                        <p>
                            <img src={ datas.icon } width="128" />
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