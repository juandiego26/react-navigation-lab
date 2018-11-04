import React, { Component } from 'react'
import Video from 'react-native-video'
import { StyleSheet, ActivityIndicator, Text, ProgressBarAndroid } from 'react-native'
import Layout from '../components/layout'
import ControlLayout from '../components/control-layout'
import PlayPause from '../components/play-pause'
import ProgressBar from '../components/progress-bar'
import TimeLeft from '../components/time-left'
import FullScreen from '../components/fullscreen'

class Player extends Component {
  // Establecemos el estado con las propiedades de los controles
  state = {
    loading: true,        // Indicador de carga
    paused: false,        // Indicador de pausa
    progress: 0,          // Progreso del video entre 0 y 1
    currentTime: '0:00',  // Tiempo actual en segundos
    duration: 0,          // Duración del vídeo en segundos
    changeActive: false,  // Activo mientras se cambia la posición del vídeo
    fullscreen: false,
  }
  // Cada vez que el video se tarde en cargar (buffer) mostaremos la animación del loader
  onLoad = () => {
    this.setState({
      loading: false,
    })
  }
  playPause = () => {
    this.setState({
      paused: !this.state.paused,
    })
  }
  setTime = payload => {
    let duration = payload.currentTime / 60
    let mins = Math.floor(duration)
    let seconds = duration % 1
    seconds = (seconds * 60) / 1000
    let currentTime = (mins + seconds * 10).toFixed(2)
    this.setState({
      currentTime: currentTime,
      progress: (payload.currentTime / payload.seekableDuration ),
      duration: payload.seekableDuration
    })
  }
  changeSliderStarted = (value) => {
    this.setState({
      progress: value,
      changeActive: true,
    })
  }
  changeSliderFinished = (value) => {
    this.setState({
      changeActive: false,
    })
    this.player.seek(this.state.duration * value)
  }
  setFullScreenPromise = () => {
    return new Promise((resolve, reject) => {
      resolve(this.setState({
        fullscreen: !this.state.fullscreen
      }))
    }).catch(error => console.error(error))
  }
  FullScreen = event => {
    this.setFullScreenPromise()
      .then(() => {
        if(this.state.fullscreen) {
          this.player.presentFullscreenPlayer();
        }
        else {
          this.player.dismissFullscreenPlayer();
        }
      });
  }
  render() {
    return (
      <Layout
        loading={this.state.loading}
        video = {
          <Video
            ref={(ref) => {
              this.player = ref
            }}
            source={{uri: 'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'}}
            style={styles.video}
            resizeMode="contain"
            onLoad={this.onLoad}
            paused={
              this.state.changeActive ?
              true :
              this.state.paused
              }
            onProgress={this.setTime}
          />
        }
        loader={
          <ActivityIndicator color="white"/>
        }
        controls={
          <ControlLayout>
            <PlayPause
              onPress={this.playPause}
              paused={this.state.paused}
            />
            <ProgressBar
              progress={this.state.progress}
              onChangeStarted={this.changeSliderStarted}
              onChangeFinished={this.changeSliderFinished}
            />
            <TimeLeft
              currentTime={this.state.currentTime}
              duration={this.state.duration}
            />
            <FullScreen
              onPress={this.FullScreen}
            />
          </ControlLayout>
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  }
})

export default Player
