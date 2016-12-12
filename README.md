## Midi Controller --> Pure Data --> CueMixFX LPF
Just like it says!  Connect a midi controller to make a variable LPF filter using the motu cuemix fx on-board DSP.

This code is 
#ugly

Who cares! It works.


dependencies:
`node`
`pd-extended`
`cuemix fx capable motu hardware`

`node parseOsc.js > oscTranslate.pd`

This script will write a pure data patch that sources a data dump from a TOUCHOSC console to convert midi data (0 - 127) to a variable LPF ranging from approx 120Hz to 18kHz.