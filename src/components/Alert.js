import React from 'react'

function Alert(props) {
    const { alert } = props;
    // console.log(alert)
    var alertClass = `alert alert-${alert.type} d-flex align-items-center alert-dismissible fade show`
    
    return (
        <div>
            {alert.alertmsg && <div class={alertClass} role="alert">
                <div>
                    <p>{alert.alertmsg}</p>
                </div>
            </div>}

        </div>
    )
}

export default Alert