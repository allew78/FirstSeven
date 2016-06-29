;window.expandableLink = (function() {

  return {
    toggle: function(id) {
      var element = document.getElementById(id)
      var iframe = this.getIframe(element)

      var isExpanded = this.isExpanded(element)
      var isLoaded = this.isLoaded(iframe)

      if(!isExpanded) {
        this.makeExpanded(element)

        if(!this.isLoaded(iframe)) {
          this.loadUrl(element, iframe)
        }
      }
      else {
        this.makeCollapsed(element)
      }
    },
    reload: function(id) {
      var element = document.getElementById(id)
      var iframe = this.getIframe(element)
      this.loadUrl(element, iframe)
    },
    getIframe: function(element) {
      return element.getElementsByTagName('iframe')[0]
    },
    loadUrl: function(element, iframe) {
      var url = element.getAttribute("data-url")
      iframe.setAttribute('src', url)
    },
    isExpanded: function(element) {
      return element.getAttribute('class').indexOf('expanded') > 0
    },
    isLoaded: function(iframe) {
      return !!iframe.getAttribute('src')
    },
    makeExpanded: function(element) {
      var height = tra.viewportDimensions.height
    
      this.replaceClassName(element, 'collapsed', 'expanded')
      var topMargin = 50
      var bottomMargin = 50
      
      var container = document.querySelector(".expandable-link-iframe-container")
      container.style.height = (height ? (height - (topMargin + bottomMargin)) : 629) + 'px'
      
      setTimeout(function() {
        container.scrollIntoView()
      }, 500);
    },
    makeCollapsed: function(element) {
      document.querySelector(".expandable-link-iframe-container").style.height = '0'
      this.replaceClassName(element, 'expanded', 'collapsed')
    },
    replaceClassName: function(element, current, replacement) {
      var classNames = element.getAttribute('class')
      classNames = classNames.replace(current, replacement)
      element.setAttribute('class', classNames)
    }
  }

}());

window.PreRecAudioplayer = (function() {

  // Start the global object
  var preRecAudioplayer = {

    playbackRates: [0.75, 1.0, 2.0],
    playbackRateClasses: ["speed_level_0", "speed_level_1", "speed_level_2"],
    defaultPlaybackRate: 1,
    
    mobileAndTabletcheck: function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    },

    load: function(id) {
      var audioPlayer = document.getElementById(id + '-audioplayer')
      if (this.mobileAndTabletcheck()) {
        document.querySelector('.volume-container').style.display = 'none'
      }
    
      var music = document.getElementById(id)
      music.volume = 0.5

      var speedbutton = document.getElementById(id + '-speedbutton')
      var playButton = document.getElementById(id + '-playbutton')
      var playButtonImage = document.getElementById(id + '-playbutton-image')
      var playhead = document.getElementById(id + '-playhead')
      var timedisplay = document.getElementById(id + '-timedisplay')
      var timeline = document.getElementById(id + '-timeline')
      var timelineWidth = timeline.clientWidth
      var duration = music.duration

      var volumebar = document.getElementById(id + '-volumebar')
      var volumebarClickContainer = document.getElementById(id + '-volumebarClickContainer')
        // Display seems to f*ck up stuff :-(
      volumebarClickContainer.style.opacity = '0'
      var volumebarClickContainerHeight = volumebar.clientHeight
      var volumeKnob = document.getElementById(id + '-volumeKnob')

      volumebarClickContainer.addEventListener("click", function(event) {
        if (volumebarClickContainer.style.opacity === "1") {
          var clickY = event.clientY - this.getPosition(volumebarClickContainer).y
          volumeKnob.style.marginTop = (clickY - volumeKnob.clientHeight / 2.0) + "px"

          var percent = clickY / volumebarClickContainerHeight
          music.volume = 1.0 - percent
        }
      }.bind(this), false)

      music.playbackRateIndex = this.defaultPlaybackRate
      music.playbackRate = this.playbackRates[this.defaultPlaybackRate]

      music.addEventListener('timeupdate', function() {
        timedisplay.innerHTML = this.getDisplayTime(music.currentTime)
        var percent = (music.currentTime / duration)
        playhead.style.marginLeft = (-10 + (percent * timelineWidth)) + "px"
      }.bind(this), false)

      music.addEventListener('loadedmetadata', function() {
        duration = music.duration
      })

      timeline.addEventListener('click', function(event) {
        var clickX = event.clientX - this.getPosition(timeline).x
        var percent = clickX / timelineWidth
        music.currentTime = duration * percent
      }.bind(this), false)

      var timeMouseDown = false
      var volumeMouseDown = false

      playhead.addEventListener('mousedown', function(event) {
        timeMouseDown = true
        document.onselectstart = function() {
            return false
          } // ie
        document.onmousedown = function() {
            return false
          } // others
        document.ontouchstart = function() {
            return false
          } // others
      }, true)

      playhead.addEventListener('touchstart', function(event) {
        timeMouseDown = true
        document.onselectstart = function() {
            return false
          } // ie
        document.onmousedown = function() {
            return false
          } // others
        document.ontouchstart = function() {
            return false
          } // others
      }, true)

      volumeKnob.addEventListener("mousedown", function(event) {
        if (volumebarClickContainer.style.opacity === "1") {
          volumeMouseDown = true
          document.onselectstart = function() {
              return false
            } // ie
          document.onmousedown = function() {
              return false
            } // others
          document.ontouchstart = function() {
              return false
            } // others
        }
      }, true)

      volumeKnob.addEventListener("touchstart", function(event) {
        if (volumebarClickContainer.style.opacity === "1") {
          volumeMouseDown = true
          document.onselectstart = function() {
              return false
            } // ie
          document.onmousedown = function() {
              return false
            } // others
          document.ontouchstart = function() {
              return false
            } // others
        }
      }, true)

      document.addEventListener('mouseup', function(event) {
        if (event.toElement != volumebarClickContainer && event.toElement != volumeKnob && event.toElement != volumebar) {
          var isHidden = volumebarClickContainer.style.opacity === "0"
          if (!isHidden) {
            this.toggleVolume(id)
          }
        }
      
        timeMouseDown = false
        volumeMouseDown = false

        document.onselectstart = null // ie
        document.onmousedown = null // others
        document.ontouchstart = null // others
      }.bind(this), true)

      document.addEventListener('touchend', function(event) {
        if (event.target != volumebarClickContainer && event.target != volumeKnob && event.target != volumebar) {
          var isHidden = volumebarClickContainer.style.opacity === "0"
          if (!isHidden) {
            this.toggleVolume(id)
          }
        }
      
        timeMouseDown = false
        volumeMouseDown = false

        document.onselectstart = null // ie
        document.onmousedown = null // others
        document.ontouchstart = null // others
      }.bind(this), true)

      var moveFunction = function(event) {
        if (timeMouseDown === true) {
          var clickX = event.clientX - this.getPosition(timeline).x
          var percent = clickX / timelineWidth
          playhead.style.marginLeft = Math.min(Math.max((-10 + (percent * timelineWidth)), -10), timelineWidth - playhead.clientWidth / 2.0) + "px"
          music.currentTime = Math.min(duration * percent, duration - 1)
        } else if (volumeMouseDown === true) {
          var positionY = this.getPosition(volumebarClickContainer).y
          var clickY = Math.min(Math.max(event.clientY - positionY, 0.0), volumebarClickContainerHeight)
          volumeKnob.style.marginTop = (clickY - volumeKnob.clientHeight / 2.0) + "px"

          var percent = clickY / volumebarClickContainerHeight
          music.volume = 1.0 - percent
        }
      }.bind(this)

      document.addEventListener('mousemove', moveFunction, true)
      document.addEventListener('touchmove', function(event) {
        event.clientX = event.touches[0].clientX
        event.clientY = event.touches[0].clientY
        moveFunction(event)
      }, true)

      music.addEventListener('ended', function() {
        playButtonImage.className = playButtonImage.className.replace(/(?:^|\s)pause(?!\S)/, ' play')
        timedisplay.innerHTML = "0:00"
        playhead.style.marginLeft = -10 + "px"
      })
    },

    playAudio: function(id) {
      var music = document.getElementById(id)
      var playButtonImage = document.getElementById(id + '-playbutton-image')

      if (music.paused) {
        music.playbackRate = this.playbackRates[this.defaultPlaybackRate]
        music.play()
        playButtonImage.className = playButtonImage.className.replace(/(?:^|\s)play(?!\S)/, ' pause')
      } else {
        music.pause()
        playButtonImage.className = playButtonImage.className.replace(/(?:^|\s)pause(?!\S)/, ' play')
      }
    },

    changeSpeed: function(id) {
      var music = document.getElementById(id)
      var speedButtonImage = document.getElementById(id + '-speedbutton-image')

      var currentPlaybackRate = music.playbackRateIndex
      var playbackRateClasses = this.playbackRateClasses
      var currentClassName = playbackRateClasses[currentPlaybackRate]

      if (currentPlaybackRate == playbackRateClasses.length - 1) {
        currentPlaybackRate = 0
      } else {
        currentPlaybackRate++
      }

      var newClassName = playbackRateClasses[currentPlaybackRate]

      music.playbackRate = this.playbackRates[currentPlaybackRate]

      music.playbackRateIndex = currentPlaybackRate

      speedButtonImage.className = speedButtonImage.className.replace(currentClassName, newClassName)
    },

    toggleVolume: function(id) {
      var volumebarClickContainer = document.getElementById(id + '-volumebarClickContainer')
      var isHidden = volumebarClickContainer.style.opacity === "0"

      volumebarClickContainer.style.opacity = isHidden ? "1" : "0"

      var volumeButton = document.getElementById(id + '-volumebutton')
      if (isHidden) {
        volumeButton.className = volumeButton.className + ' ' + 'audio-button-selected'
      } else {
        volumeButton.className = volumeButton.className.replace(/(?:^|\s)audio-button-selected(?!\S)/, '')
      }
    },

    getDisplayTime: function(time) {
      var minutes = Math.floor(time / 60.0)
      var seconds = Math.floor(time - (minutes * 60.0))

      return this.getNumberString(minutes, 1) + ":" + this.getNumberString(seconds, 2)
    },

    getNumberString: function(number, digits) {
      var numberString = "" + number
      while (numberString.length < digits) {
        numberString = "0" + numberString
      }
      return numberString
    },

    // Based on: https://www.kirupa.com/html5/getting_mouse_click_position.htm
    getPosition: function(element) {
      var xPosition = 0
      var yPosition = 0

      while (element) {
        if (element.tagName == "BODY") {
          // deal with browser quirks with body/window/document and page scroll
          var xScrollPos = element.scrollLeft || document.documentElement.scrollLeft
          var yScrollPos = element.scrollTop || document.documentElement.scrollTop

          xPosition += (element.offsetLeft - xScrollPos + element.clientLeft)
          yPosition += (element.offsetTop - yScrollPos + element.clientTop)
        } else {
          xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft)
          yPosition += (element.offsetTop - element.scrollTop + element.clientTop)
        }

        element = element.offsetParent
      }
      return {
        x: xPosition,
        y: yPosition
      }
    }
  }

  // Return the global object
  return preRecAudioplayer

})()
;window.VideoPlayer = (function(){

    // Start the global object
    var videoPlayer = {
        mediaPlayer: null,
    
        load: function(id) {
            mediaPlayer = document.getElementById(id + '-media-video')
            mediaPlayer.controls = false
            
            mediaPlayer.addEventListener('timeupdate', function() {
                this.updateProgressBar(id)
            }.bind(this), false)
            
            mediaPlayer.addEventListener('play', function() {
                var btn = document.getElementById(id + '-play-pause-button')
                this.changeButtonType(btn, 'pause')
            }.bind(this), false)
            
            mediaPlayer.addEventListener('pause', function() { 
                var btn = document.getElementById(id + '-play-pause-button')
                this.changeButtonType(btn, 'play')
            }.bind(this), false)
            
            mediaPlayer.addEventListener('volumechange', function(e) {
                var btn = document.getElementById(id + '-mute-button')
                if (mediaPlayer.muted) {
                    this.changeButtonType(btn, 'unmute')
                }
                else {
                    this.changeButtonType(btn, 'mute')
                }
            }.bind(this), false)
        },
        
        togglePlayPause: function(id) {
            var btn = document.getElementById(id + '-play-pause-button')
            if (mediaPlayer.paused || mediaPlayer.ended) { 
                btn.title = 'pause' 
                btn.innerHTML = 'pause' 
                btn.className = 'pause' 
                mediaPlayer.play()
            }
            else {
                btn.title = 'play'
                btn.innerHTML = 'play'
                btn.className = 'play'
                mediaPlayer.pause()
            }
        },
        
        changeButtonType: function(btn, value) {
            btn.title = value
            btn.innerHTML = value
            btn.className = value
        },
        
        stopPlayer: function() {
            mediaPlayer.pause()
            mediaPlayer.currentTime = 0
        },
        
        changeVolume: function(direction) {
            if (direction === '+') {
                mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1
            }
            else {
                mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1)
            }
            
            mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1)
        },
        
        toggleMute: function(id) {
            var btn = document.getElementById(id + '-mute-button')
            
            if (mediaPlayer.muted) {
                changeButtonType(btn, 'mute')
                mediaPlayer.muted = false
            }
            else {
                changeButtonType(btn, 'unmute')
                mediaPlayer.muted = true
            }
        },
        
        replayMedia: function() {
            resetPlayer()
            mediaPlayer.play()
        },
        
        resetPlayer: function() {
            mediaPlayer.currentTime = 0
            changeButtonType(playPauseBtn, 'play')
        },
        
        updateProgressBar: function(id) {
            var progressBar = document.getElementById(id + '-progress-bar')
            var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime)
            progressBar.value = percentage
            progressBar.innerHTML = percentage + '% played'
        },
        
        resetPlayer: function() {
            progressBar.value = 0
            mediaPlayer.currentTime = 0
            changeButtonType(playPauseBtn, 'play')
        }
    }

    // Return the global object
    return videoPlayer

})()