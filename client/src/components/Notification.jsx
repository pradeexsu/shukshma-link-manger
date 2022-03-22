import React, { Component } from 'react'
import "./Notification.css"
import $ from 'jquery';

class Notification extends Component {
  componentDidMount() {
    this.init()
  }
  
  init = () => {
    const displyMsg = this.props.msg
    // data
    var clear;
    var msgDuration = 4000; // 2 seconds
    var $msgSuccess = `Success :) ${displyMsg}`;
    var $msgDanger = `Error :( ${displyMsg}!`;
    var $msgWarning = `Warning :@ ${displyMsg}`;
    // var $msgInfo = `This is a friendly reminder: ${displyMsg}`;

    // cache DOM
    var $msg = $('.msg');

    // render message
    function render(message) {
      hide();
      switch (message) {
        case 'success':
          $msg.addClass('msg-success active').text($msgSuccess);
          break;
        case 'danger':
          $msg.addClass('msg-danger active').text($msgDanger);
          break;
        case 'warning':
          $msg.addClass('msg-warning active').text($msgWarning);
          break;
      }
    }

    function timer() {
      clearTimeout(clear);
      clear = setTimeout(function () {
        hide();
      }, msgDuration)
    }

    function hide() {
      $msg.removeClass('msg-success msg-danger msg-warning msg-info active');
    }

    // bind events
    render(this.props.msgType)
    // $msg.on('transitionend', timer);
    timer()

  };
  render() {
    return (
      <div className="msg animate slide-in-down"></div>
    )
  }
}


export default Notification;