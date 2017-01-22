/*
* @Author: Adrian Tomic
* @Date:   2017-01-18 06:02:54
* @Last Modified by:   Adrian Tomic
* @Last Modified time: 2017-01-19 21:26:50
*/

// https://www.bananarobotics.com/shop/How-to-use-the-HG7881-(L9110)-Dual-Channel-Motor-Driver-Module
// We recommend using input 1A to control the speed of each motor and input 1B to control the direction.


'use strict';

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var motors = new five.Motors([
    { pins: { dir: 4, pwm: 3 } }, // Front  left
    { pins: { dir: 4, pwm: 5 } }, // Front right
    { pins: { dir: 4, pwm: 6 } }, // Rear left
    { pins: { dir: 4, pwm: 9 } }  // Rear right
  ]);

  motors.on

  // Create a standard `led` component instance
  // var led = new five.Led(13);

  // "blink" the led in 500ms
  // on-off phase periods
  // led.blink(500);
});