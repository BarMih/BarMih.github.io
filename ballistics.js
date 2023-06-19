document.addEventListener('DOMContentLoaded', (event) => {

    let canvas = document.getElementById('canvas_ballistics');
    let ctx = canvas.getContext('2d')

    function clear() {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect( 0, 0, canvas.width, canvas.height);
    }





    class Planet {

        constructor(planetName = '', planetImage = [], planetXPos = 0, planetYPos = 0, planetVelocity = 0, planetRadius = 0, planetGravConst = 0) {
            this.planetName = planetName
            this.planetImage = planetImage
            this.planetXPos = planetXPos
            this.planetYPos = planetYPos
            this.planetVelocity = planetVelocity
            this.planetRadius = planetRadius
            this.planetGravConst = planetGravConst
        }

        draw() {

            let anglePersonal = 0
            let angle = 0

            if (this.planetName === 'Земля') {

                anglePersonal = earthPersonalW * timeM

                ctx.save()
                ctx.translate(SCXPos, SCYPos)
                ctx.rotate( anglePersonal)
                ctx.scale(earthScale, earthScale)
                ctx.drawImage(this.planetImage, - this.planetRadius, - this.planetRadius, this.planetRadius*2, this.planetRadius*2)
                ctx.restore()
            }

            if (this.planetName === 'Луна') {

                angle = moonAngle + moonW * timeM
                anglePersonal = - moonPersonalW * timeM
                
                ctx.save()
                ctx.translate(SCXPos, SCYPos)
                ctx.translate(moonDistance * Math.cos(angle + Math.PI), - moonDistance * Math.sin(angle + Math.PI))
                ctx.rotate(anglePersonal)
                ctx.scale(moonScale, moonScale)
                ctx.drawImage(this.planetImage, - this.planetRadius, - this.planetRadius, this.planetRadius*2, this.planetRadius*2)
                ctx.restore()
            }

        }





    }



    class CosmicBlock {

        constructor(blockName = '', blockImage = [], blockXPos = 0, blockYPos = 0, blockWidth = 0, blockHeight = 0) {
            this.blockName = blockName
            this.blockImage = blockImage
            this.blockXPos = blockXPos
            this.blockYPos = blockYPos
            this.blockWidth = blockWidth
            this.blockHeight = blockHeight
        }

        draw() {

            let E = EAngle(timeM)
            let V = VAngle(E)
            let xEyE = XEYE(V)
            let VrVt = VRVT(V)
            timePastE = timeM
            // console.log(E, V, xEyE)
            let H = HArea( - timeM + ts)
            let VG = VAngleG(H)
            let xGyG = XGYG(VG)
            let VrVtG = VRVTG(VG)
            timePastG = - timeM + ts

            // console.log(this.blockXPos + xEyE[0], this.blockYPos - xEyE[1])
            // console.log(this.blockXPos - aE - cE - cG - xGyG[0], this.blockYPos - xGyG[1])
            ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
            
            // ctx.strokeRect(this.blockXPos - aE + cE, this.blockYPos, xEyE[0], - xEyE[1])
            // ctx.strokeRect(this.blockXPos - 2*aE, this.blockYPos, - xGyG[0], - xGyG[1])

            // ctx.strokeRect(this.blockXPos - aE - aE - cG + aG, this.blockYPos, 40, -40)
            // console.log(VrVt[1]/scaleDistance,VrVt[0]/scaleDistance, Math.sqrt( Math.pow(VrVt[1]/scaleDistance,2) + Math.pow(VrVt[0]/scaleDistance,2) ))
            // console.log(xEyE[0], - xEG)
            this.blockWidth = ABUWidth
            this.blockHeight = this.blockWidth / this.blockImage.width * this.blockImage.height
            if ( xEyE[0] > - xEG ) {
                ctx.strokeRect(this.blockXPos - aE + cE, this.blockYPos, xEyE[0], - xEyE[1])
                ctx.save()
                ctx.translate(this.blockXPos - aE + cE + xEyE[0], this.blockYPos - xEyE[1])
                ctx.rotate( Math.atan(VrVt[0]/VrVt[1]) - V )
                // ctx.strokeStyle = 'rgba(0, 0, 0, 1)'
                // ctx.strokeRect(this.blockXPos - this.blockWidth/2, this.blockYPos - this.blockHeight/2, this.blockWidth, this.blockHeight)
                ctx.drawImage(this.blockImage, - this.blockWidth/2, - this.blockHeight/2, this.blockWidth, this.blockHeight)
                ctx.restore()
                velocityText = 'Скорость: ' + ( Math.sqrt( Math.pow( VrVt[0] , 2 ) + Math.pow( VrVt[1] , 2 ) ) / Math.pow(scaleDistance, 1) * Math.pow(1000, 1) ).toFixed(3)
            }
            if ( - xGyG[0] < aE + cE - xEG && - xGyG[0] > - cG + aG ) {
                ctx.strokeRect(this.blockXPos - 2*aE, this.blockYPos, - xGyG[0], - xGyG[1])
                ctx.save()
                ctx.translate(this.blockXPos - aE - aE - cG + aG - xGyG[0], this.blockYPos - xGyG[1])
                ctx.rotate( - Math.atan(VrVtG[0]/VrVtG[1]) + VG + Math.PI)
                ctx.drawImage(this.blockImage, - this.blockWidth/2, - this.blockHeight/2, this.blockWidth, this.blockHeight)
                ctx.restore()
                velocityText = 'Скорость: ' + ( Math.sqrt( Math.pow( VrVtG[0] , 2 ) + Math.pow( VrVtG[1] , 2 ) ) / Math.pow(scaleDistance, 1) * Math.pow(1000, 1) ).toFixed(3)
            }


            // timePast = timeM
            

        }

    }





    function EAngle(t) {
        if (t !== timePastE)
        E = Math.PI
        let EDif = Math.PI

        while ( Math.abs((txE - t) / (t - timePastE)) > 0.01 && t !== timePastE) {
            if ( txE >= t ) {
                while (txE >= t) {
                    E -= EDif/2
                    txE = Math.pow(aE, 3/2) / Math.sqrt(earthGravConst) * (E-eE*Math.sin(E))
                }
                EDif /= 2
            }
            else if ( txE < t ) {
                while (txE < t) {
                    E += EDif/2
                    txE = Math.pow(aE, 3/2) / Math.sqrt(earthGravConst) * (E-eE*Math.sin(E))
                }
                EDif /= 2
            }
        }
        // console.log(txE/1000, t/1000, timePastE/1000)
        return E
    }

    function VAngle(E) {
        let V = 2*Math.atan( Math.sqrt( ( 1 + eE ) / ( 1 - eE ) ) * Math.tan( E / 2 ) )
        return V
    }

    function XEYE(V) {
        let xE = pE / (1 + eE * Math.cos(V)) * Math.cos(V)
        let yE = pE / (1 + eE * Math.cos(V)) * Math.sin(V)
        return [xE, yE]
    }

    function VRVT(V) {
        let Vr = eE*Math.sin(V) * Math.sqrt(earthGravConst/pE)
        let Vt = (1 + eE*Math.cos(V)) * Math.sqrt(earthGravConst/pE)
        return [Vr, Vt]
    }






    function HArea(t) {
        if (t !== timePastG)
        H = 43504612434.939 / 2 * Math.pow(scaleDistance, 2)
        let HDif = H
        while ( Math.abs((txG - t) / (t - timePastG)) > 0.01 && t !== timePastG) {
            if ( txG >= t ) {
                while (txG >= t) {
                    H -= HDif/2
                    txG = Math.pow(aG, 3/2) / Math.sqrt(moonGravConst) * (eG*Math.sinh(H) - H)
                }
                HDif /= 2
            }
            else if ( txG < t ) {
                while (txG < t) {
                    H += HDif/2
                    txG = Math.pow(aG, 3/2) / Math.sqrt(moonGravConst) * (eG*Math.sinh(H) - H)
                }
                HDif /= 2
            }
        }
        // console.log(txG/1000, t/1000, timePastG/1000)
        return H
    }

    function VAngleG(H) {
        let VG = 2 * Math.atan( Math.sqrt( ( eG + 1 ) / ( eG - 1 ) ) * Math.tanh(H/2) )
        return VG
    }

    function XGYG(VG) {
        let xG = pG / (1 + eG * Math.cos(VG)) * Math.cos(VG)
        let yG = pG / (1 + eG * Math.cos(VG)) * Math.sin(VG)
        return [xG, yG]
    }

    function VRVTG(VG) {
        let VrG = eG*Math.sin(VG) * Math.sqrt(moonGravConst/pG)
        let VtG = (1 + eG*Math.cos(VG)) * Math.sqrt(moonGravConst/pG)
        return [VrG, VtG]
    }







    let pause = false
    let timeM = 0
    let timeS = 0
    let timeMin = 0
    let timeH = 0
    let timeD = 0
    let txE = 0
    let txG = 0
    let timePast = 0
    let timePastE = 0
    let timePastG = 0

    let gameFrame

    let SCXPos = canvas.width * 3 / 4
    let SCYPos = canvas.height * 3 / 4

    let scale = 2
    let scalePlanet = 0.001 * scale
    let scaleDistance = 0.001 * scale
    let scaleTime = Math.pow( 1, 1 )
    let earthScale = 10
    let moonScale = 10

    let earthOrbit = 200 * scalePlanet
    let moonOrbit = 200 * scalePlanet

    let moonDistance = 420000 * scaleDistance
    let moonDistanceAverage = 384400 * scaleDistance
    let moonAngle = - 0.934
    let moonInfluenceDistance = 66000 * scaleDistance


    

    let Earth
    let earthName = 'Земля'
    let earthImage = makeImgForFrames(earthName)
    let earthXPos = SCXPos
    let earthYPos = SCYPos
    let earthRadius = 6371 * scalePlanet
    let earthGravConst = 398600.4 * Math.pow(scaleDistance, 3) / Math.pow(1000, 2)
    let earthVelocity = 0 * scaleDistance / 1000
    let earthPersonalW = 2*Math.PI/(1000*60*60*24)


    let Moon
    let moonName = 'Луна'
    let moonImage = makeImgForFrames(moonName)
    let moonXPos = SCXPos - moonDistance
    let moonYPos = SCYPos
    let moonRadius = 1738 * scalePlanet
    let moonGravConst = 4902.72 * Math.pow(scaleDistance, 3) / Math.pow(1000, 2)
    let moonVelocity = 1.023 * scaleDistance / 1000
    let moonPersonalW = 2*Math.PI/(1000*60*(60*(24*27+7)+40))
    let moonW = moonVelocity / moonDistanceAverage


    let planetsArr = [Earth, Moon]

    let ABUName = 'РТБ'
    let ABUImage = makeImgForFrames(ABUName)
    let ABUXPos = SCXPos + earthRadius + earthOrbit
    let ABUYPos = SCYPos
    let ABUWidth = 30
    let ABUHeight = ABUWidth / ABUImage.width * ABUImage.height

    let skyImage = makeImgForFrames('Звездное небо')
    
    let E = Math.PI
    let H = 43504612434.939 / 2 * Math.pow(scaleDistance, 2)


    function makeImgForFrames(imageName) {
        let img = new Image()
        img.addEventListener('load', function() {
            
        }, false)
        img.src = '/img/Баллистика/' + imageName + '.png'
        return img
    }

    let planetNameArr = [earthName, moonName]
    let planetImagesArr = [earthImage, moonImage]
    let planetXPosArr = [earthXPos, moonXPos]
    let planetYPosArr = [earthYPos, moonYPos]
    let planetVelocityArr = [earthVelocity, moonVelocity]
    let planetRadiusArr = [earthRadius, moonRadius]
    let planetGravConstArr = [earthGravConst, moonGravConst]

    

    for (let planet = 0; planet < planetsArr.length; planet++) {
        planetsArr[planet] = new Planet(planetName = planetNameArr[planet], planetImage = planetImagesArr[planet], planetXPos = planetXPosArr[planet], planetYPos = planetYPosArr[planet], planetVelocity = planetVelocityArr[planet], planetRadius = planetRadiusArr[planet], planetGravConst = planetGravConstArr[planet])
    }

    let ABU = new CosmicBlock(blockName = ABUName, blockImage = ABUImage, blockXPos = ABUXPos, blockYPos = ABUYPos, blockWidth = ABUWidth, blockHeight = ABUHeight)



    let aE = 213285.5 * scaleDistance
    let bE = 52533.989 * scaleDistance
    let cE = 206714.5 * scaleDistance
    let eE = 0.969
    let pE = 12939.558 * scaleDistance

    let xEG = 364115.929 * scaleDistance
    let yEG = 35450.854 * scaleDistance

    let aG = 17454.892 * scaleDistance
    let bG = 8450.503 * scaleDistance
    let cG = 19392.892 * scaleDistance
    let eG = 1.111
    let pG = 4091.174 * scaleDistance

    let yi = 0



    let r1 = Math.sqrt( Math.pow( xEG , 2) + Math.pow( yEG , 2) )

    let VE1 = Math.acos( ( pE / r1 - 1 ) / eE )

    let E1 = 2 * Math.atan( Math.tan( VE1 / 2 ) / Math.sqrt( ( 1 + eE ) / ( 1 - eE ) ) )
    
    let t1 = Math.pow(aE, 3/2) / Math.sqrt(earthGravConst) * (E1 - eE * Math.sin(E1))

    // console.log(r1, VE1, E1, t1)

    let r2 = Math.sqrt( Math.pow( aE + cE - xEG , 2) + Math.pow( yEG , 2) )

    let VE2 = Math.acos( ( pG / r2 - 1 ) / eG )

    let H2 = 2 * Math.atanh( Math.tan( VE2 / 2 ) / Math.sqrt( ( eG + 1 ) / ( eG - 1 ) ) )
    
    let t2 = Math.pow(aG, 3/2) / Math.sqrt(moonGravConst) * (eG * Math.sinh(H2) - H2)

    let ts = t1 + t2

    // console.log(r2, VE2, H2, t2)
    // console.log(ts/1000)



    function draworbit() {

        ctx.lineWidth = 0.4

        // Орбита Луны
        ctx.save()
        ctx.beginPath()
        ctx.arc( SCXPos, SCYPos, moonDistance, 0, Math.PI*2 )
        ctx.stroke()
        ctx.restore()
        
        // Сфера действия Луны
        ctx.save()
        ctx.beginPath()
        ctx.arc( moonXPos, moonYPos, moonInfluenceDistance, 0, Math.PI*2 )
        ctx.stroke()
        ctx.restore()

        // Стартовая круговая орбита Земли
        ctx.save()
        ctx.beginPath()
        ctx.arc( SCXPos, SCYPos, earthRadius + earthOrbit, 0, Math.PI*2 )
        ctx.stroke()
        ctx.restore()

        // Эллипс
        ctx.save()
        ctx.beginPath()
        ctx.ellipse( SCXPos - cE, SCYPos, aE, bE, 0, Math.PI + Math.atan((Math.sqrt(Math.pow(aE,2)-Math.pow(xEG-cE,2)))/(xEG-cE)), Math.PI*2 )
        // ctx.ellipse( SCXPos - cE, SCYPos, aE, bE, 0, Math.PI, Math.PI*2 )
        ctx.stroke()
        ctx.restore()

        // Целевая круговая орбита Луны
        ctx.save()
        ctx.beginPath()
        ctx.translate( moonXPos, moonYPos )
        ctx.arc( 0, 0, moonRadius + moonOrbit, 0, Math.PI*2 )
        ctx.stroke()
        ctx.restore()

        // Гипербола
        ctx.save()
        ctx.beginPath()
        ctx.translate( moonXPos - cG, moonYPos )
        ctx.moveTo( aG, 0 )
        for ( let xi = aG; xi <= (cG + cE + aE - xEG); xi++ ) {
            yi = bG * Math.sqrt( Math.pow( ( xi ) / aG , 2 ) - 1 )
            ctx.lineTo(xi, -yi)
        }
        ctx.stroke()
        ctx.restore()




        // ctx.save()
        // ctx.beginPath()
        // // ctx.strokeRect(SCXPos, SCYPos, r1*Math.cos(VE1), - r1*Math.sin(VE1))
        // ctx.translate(SCXPos, SCYPos)
        // // ctx.rotate(-VE1)
        // ctx.strokeRect(0, 0, xEG, - eEG)
        // ctx.stroke()
        // ctx.restore()

        // ctx.save()
        // ctx.beginPath()
        // // ctx.strokeRect(SCXPos - cE, SCYPos, r1*Math.cos(VE1), - r1*Math.sin(VE1))
        // ctx.translate(SCXPos - cE, SCYPos)
        // ctx.rotate(-E1)
        // ctx.strokeRect(0, 0, r1, - r1)
        // ctx.stroke()
        // ctx.restore()

        // ctx.save()
        // ctx.beginPath()
        // ctx.translate(SCXPos, SCYPos)
        // ctx.strokeRect(0, 0, - moonDistance, - 20)
        // ctx.stroke()
        // ctx.restore()


    }

    function drawBackground() {
        // ctx.drawImage(skyImage, 0, 0, canvas.width, canvas.height)
        ctx.save()
        ctx.fillStyle = 'rgba(0, 0, 0, 1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.restore()
    }







    let arrowLeft = false
    let arrowRight = false
    let timeStop = false
    let timeSpeed = Math.pow( 10, 6 )

    // Стрелка влево
    addEventListener("keydown", function(event) {
        if (event.code == 'ArrowLeft') {
            event.preventDefault()
            arrowLeft = true
        }
    })

    // Стрелка вправо
    addEventListener("keydown", function(event) {
        if (event.code == 'ArrowRight') {
            event.preventDefault()
            arrowRight = true
        } 
    })

    // Стрелка влево
    addEventListener("keyup", function(event) {
        if (event.code == 'ArrowLeft') {
            event.preventDefault()
            arrowLeft = false
        }
    })

    // Стрелка вправо
    addEventListener("keyup", function(event) {
        if (event.code == 'ArrowRight') {
            event.preventDefault()
            arrowRight = false
        } 
    })

    // Стрелка вниз
    addEventListener("keydown", function(event) {
        if (event.code == 'ArrowDown' && !timeStop) {
            event.preventDefault()
            timeStop = true
        }
    })

    // Стрелка вверх
    addEventListener("keydown", function(event) {
        if (event.code == 'ArrowUp' && timeStop) {
            event.preventDefault()
            timeStop = false
        } 
    })


    
    let velocityText = ''


    function time() {
        if (arrowLeft) {
            timeM -= timeSpeed
        }
        if (arrowRight) {
            timeM += timeSpeed
        }

        ctx.save()

        let timeTextSize = 24
        ctx.fillStyle = 'white'
        ctx.font = timeTextSize + 'px serif'
        ctx.textAlign = 'start'

        let timeText = 'Время: ' + timeD + ' д ' + timeH % 24 + ' ч ' + timeMin % 60 + ' м '+ timeS % 60 + ' c'
        text = ctx.measureText(timeText)
        let timeTextWidth = text.width
        ctx.fillText(timeText, canvas.width / 2 - timeTextWidth / 2, canvas.height / 2)
        ctx.fillText(velocityText, canvas.width / 2 - timeTextWidth / 2, canvas.height / 2 + 40)
        ctx.restore()
    }




    


    function drawAll() {

        clear()
        drawBackground()

        for (let planet = 0; planet < planetsArr.length; planet++) {
            planetsArr[planet].draw()
        }
        // console.log(tx, timeM, timePast, Math.abs((tx - timeM)/(timeM - timePast)))
        ABU.draw()
        draworbit()
        // console.log(planetsArr)

        time()

        gameFrame = window.requestAnimationFrame(drawAll)
        if (!timeStop && !(arrowLeft || arrowRight) ) {
            timeM += 1000/60 * scaleTime

            timeS = Math.trunc(timeM/1000)
            timeMin = Math.trunc(timeS/60)
            timeH = Math.trunc(timeMin/60)
            timeD = Math.trunc(timeH/24)
            // console.log( 'Time is: ' + timeS + ' s ' + timeMin + ' m ' + timeH + ' h ' + timeD + ' d')
            // console.log( 'Time is: ' + timeS % 60 + ' s ' + timeMin % 60 + ' m ' + timeH % 24 + ' h ' + timeD + ' d')
        }
        

        
        

    }


    drawAll()


})
