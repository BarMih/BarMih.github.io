document.addEventListener('DOMContentLoaded', (event) => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d')

    function clear() {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect( 0 + xTranslate, 0, canvas.width, canvas.height);
    }








    class Tower {


        constructor(health = 1000, totalHealth = 1000, xTowerPos = 0, yTowerPos = 0, towerWidth = 20, totalTowerHeight = 80, towerHeight = 80, color = 'black', side = 'allies', balistaAngle = 45, balistaAxisXPos = 0, balistaAxisYPos = 0) {
            this.health = health
            this.totalHealth = totalHealth
            this.xTowerPos = xTowerPos
            this.yTowerPos = yTowerPos
            this.towerWidth = towerWidth
            this.towerHeight = towerHeight
            this.color = color
            this.side = side
            this.totalTowerHeight = totalTowerHeight
            this.balistaAngle = balistaAngle
            this.balistaAxisXPos = balistaAxisXPos
            this.balistaAxisYPos = balistaAxisYPos
        }

        draw() {
            ctx.fillStyle = this.color
            let healtBar = 0
            let healthBarMax = 0
            let healthBarHeight = 10

            this.balistaAxisXPos = this.xTowerPos + this.towerWidth * .8
            this.balistaAxisYPos = this.yTowerPos + this.towerHeight * .8
            let balistaWidth = 20
            let balistaHeight = 60


            if (this.health <= 0) {
                endOfGame = true
                if (this.side === 'allies') {
                    weakling = 'allie'
                }
                else if (this.side === 'enemies') {
                    weakling = 'enemie'
                }
                return
            }
                
            // Полоска здоровья башен
            healthBarMax = this.towerWidth
            healtBar = this.towerWidth * this.health / this.totalHealth  

            ctx.save()
            ctx.fillStyle = 'green' 
            if (this.side === 'allies') {
                ctx.fillRect( 20 + xTranslate, 20, healtBar, healthBarHeight)
            }
            else if (this.side === 'enemies') {
                ctx.fillRect(canvas.width - 20 + xTranslate, 20, - healtBar, healthBarHeight)
            }
            ctx.restore()
   

            // Башня
            ctx.save()
            ctx.fillStyle = 'black'  
            ctx.fillRect(this.xTowerPos, this.yTowerPos, this.towerWidth, this.towerHeight)
            ctx.restore()


            // Балиста
            if (this.side === 'allies') {
                ctx.save()
                ctx.fillStyle = 'grey'  
                ctx.translate(this.balistaAxisXPos, this.balistaAxisYPos)
                ctx.rotate((Math.PI / 180) * ( - this.balistaAngle + 90) )
                ctx.translate( - this.balistaAxisXPos, - this.balistaAxisYPos)
                ctx.fillRect(this.balistaAxisXPos - balistaWidth / 2, this.balistaAxisYPos - balistaHeight * .8, balistaWidth, balistaHeight)
                ctx.fillStyle = 'red'
                ctx.fillRect(this.balistaAxisXPos - 1, this.balistaAxisYPos - 1, 2, 2)
                ctx.restore()    
            }
        }
    }































    class Unit {


        constructor(health = 0, attack = 0, attackRange = 0, defence = 0, manaUnitRequest = 0, unitXPos = 0, unitYPos = 0, unitXVelocity = 0, unitWidth = 0, unitHeight = 0, color = 'green', unitImg, side = 'allies', attackingNow = false, attackTime = 1000, unitAnimation = [], unitWalkAnimation = [], unitWalkTime = 0, unitWalkPose = 0, walkingNow = false, typeOfUnit = '', attackingBaseNow = false, attackCase = false, attackBaseCase = false, finalAttackCase = false, unitScale = 1, unitXTransition = 0, unitYTransition = 0, unitDyingAnimation = [], unitAttackStartTimeM = 0, unitAttackPose = 0, unitWalkStartTimeM = 0) {
            this.health = health
            this.attack = attack
            this.attackRange = attackRange
            this.defence = defence
            this.unitXPos = unitXPos
            this.unitYPos = unitYPos
            this.unitXVelocity = unitXVelocity
            this.unitWidth = unitWidth
            this.unitHeight = unitHeight
            this.color = color
            this.side = side
            this.attackingNow = attackingNow
            this.attackTime = attackTime
            this.unitAnimation = unitAnimation
            this.unitWalkAnimation = unitWalkAnimation
            this.unitWalkTime = unitWalkTime
            this.unitWalkPose = unitWalkPose
            this.walkingNow = walkingNow
            this.typeOfUnit = typeOfUnit
            this.attackingBaseNow = attackingBaseNow
            this.attackCase = attackCase
            this.attackBaseCase = attackBaseCase
            this.finalAttackCase = finalAttackCase
            this.unitImg = unitImg
            this.unitScale = unitScale
            this.unitXTransition = unitXTransition
            this.unitYTransition = unitYTransition
            this.unitDyingAnimation = unitDyingAnimation
            this.unitAttackStartTimeM = unitAttackStartTimeM
            this.unitAttackPose = unitAttackPose
            this.unitWalkStartTimeM = unitWalkStartTimeM
        }

        draw() {
            ctx.fillStyle = this.color
            let unitOppositeArr = false
            let deadArr = []
            let caseStop = false
            let towerAttack = false
            let sliceStepCase = false
            let slicedStep = 0
            let minSlicedStep = 0
            let minTowerSlicedStep = 0
            let finalSlicedStepCase = false
            let damagedArr = []
            let arrHalf = 0
            let attackDistance = 0
            let minDistance = 0
            let minTowerDistance = 0
            let timeOfProjectile = 0
            let projectileXVelocity = 0
            let projectileYVelocity = 0
            let sideOfProjectile = ''
            let attackTowerCase = false
            this.attackCase = false
            this.attackBaseCase = false
            this.finalAttackCase = false

            let optimalAngle = 0

            let mnogitel = 0

            let heightDifference = 0


            if (this.dead === false) {
                if (this.side === 'allies') {
                    unitAlliesArr = killUnit(unitAlliesArr, this)
                }
                else if (this.side === 'enemies') {
                    unitEnemiesArr = killUnit(unitEnemiesArr, this)
                }
                corpsesArr.push(this)
                return
            }


            if (this.side === 'allies' && !!unitEnemiesArr[0]) {
                unitOppositeArr = unitEnemiesArr
            }
            else if (this.side === 'enemies' && !!unitAlliesArr[0]) {
                unitOppositeArr = unitAlliesArr
            }

            if (this.unitXVelocity === 0) {
                caseStop = true
            }

            if (this.health <= 0) {
                console.log('Health below zero')
            }

            function calcHalfArr(arr) {
                if (arr.length % 2 === 0) {
                    arrHalf = arr.length / 2
                }
                else if (arr.length % 2 !== 0) {
                    arrHalf = (arr.length - 1) / 2
                }
                return arrHalf
            }
            
            function calcOptimalAngle(Xdistance, Ydistance) {
                optimalAngle = Math.atan( ( Math.pow(maxVel, 2) - Math.pow( ( Math.pow(maxVel, 4) - GAcceleration * ( GAcceleration * Math.pow(Xdistance, 2) + 2 * Math.pow(maxVel, 2) * Ydistance ) ) , .5) ) / ( GAcceleration * Xdistance ) )
                return optimalAngle
            }

            function shootProjectile(unit, maxVel, minDistance, heightDifference) {
                optimalAngle = calcOptimalAngle(minDistance, - heightDifference)
                projectileXVelocity = Math.cos( optimalAngle ) * maxVel
                projectileYVelocity = - Math.sin( optimalAngle ) * maxVel
                if (unit.typeOfUnit === 'archer') {
                    if (unit.side === 'allies') {
                        addProjectile(sideOfProjectile = 'allies', unit.unitXPos + unit.unitWidth, unit.unitYPos + unit.unitHeight * 0, projectileXVelocity, projectileYVelocity, unit)
                    }
                    else if (unit.side === 'enemies') {
                        addProjectile(sideOfProjectile = 'enemies', unit.unitXPos, unit.unitYPos + unit.unitHeight * 0, - projectileXVelocity, projectileYVelocity, unit)
                    }
                }
                if (unit.typeOfUnit === 'electricMage') {
                    if (unit.side === 'allies') {
                        addProjectile(sideOfProjectile = 'allies', unit.unitXPos + unit.unitWidth, unit.unitYPos + unit.unitHeight * 0, projectileXVelocity, projectileYVelocity, unit)
                    }
                    else if (unit.side === 'enemies') {
                        addProjectile(sideOfProjectile = 'enemies', unit.unitXPos, unit.unitYPos + unit.unitHeight * 0, - projectileXVelocity, projectileYVelocity, unit)
                    }
                }
            }
            




            for (let unit in unitOppositeArr) {


                if (this.side === 'allies' && !!unitOppositeArr[0]) {
                    this.attackCase = this.unitXPos + this.unitWidth + this.attackRange >= unitOppositeArr[unit].unitXPos && this.unitXPos + this.unitWidth <= unitOppositeArr[unit].unitXPos
                    attackDistance = unitOppositeArr[unit].unitXPos - this.unitXPos - this.unitWidth
                    if (this.attackCase && minDistance === 0) {
                        minDistance = attackDistance
                        heightDifference = this.unitHeight - unitOppositeArr[unit].unitHeight * .6
                    }
                    else if (this.attackCase && minDistance > attackDistance) {
                        minDistance = attackDistance
                        heightDifference = this.unitHeight - unitOppositeArr[unit].unitHeight * .6
                    }
                    sliceStepCase = this.unitXPos + this.unitWidth + this.attackRange <= unitOppositeArr[unit].unitXPos && this.unitXPos + this.unitWidth + this.unitXVelocity >= unitOppositeArr[unit].unitXPos
                    slicedStep = this.unitXPos + this.unitWidth + this.attackRange + this.unitXVelocity - unitOppositeArr[unit].unitXPos
                    if (minSlicedStep === 0 && sliceStepCase) {
                        minSlicedStep = slicedStep
                        finalSlicedStepCase = true
                    }
                    else if (minSlicedStep <= slicedStep && sliceStepCase) {
                        minSlicedStep = slicedStep
                        finalSlicedStepCase = true
                    }
                }
                else if (this.side === 'enemies' && !!unitOppositeArr[0]) {
                    this.attackCase = this.unitXPos - this.attackRange <= unitOppositeArr[unit].unitXPos + unitOppositeArr[unit].unitWidth && this.unitXPos >= unitOppositeArr[unit].unitXPos + unitOppositeArr[unit].unitWidth
                    attackDistance = this.unitXPos - unitOppositeArr[unit].unitXPos - unitOppositeArr[unit].unitWidth
                    if (this.attackCase && minDistance === 0) {
                        minDistance = attackDistance
                        heightDifference = this.unitHeight - unitOppositeArr[unit].unitHeight * .6
                    }
                    else if (this.attackCase && minDistance > attackDistance) {
                        minDistance = attackDistance
                        heightDifference = this.unitHeight - unitOppositeArr[unit].unitHeight * .6
                    }
                    sliceStepCase = this.unitXPos - this.attackRange >= unitOppositeArr[unit].unitXPos + unitOppositeArr[unit].unitWidth && this.unitXPos + this.unitXVelocity <= unitOppositeArr[unit].unitXPos + unitOppositeArr[unit].unitWidth
                    slicedStep = this.unitXPos - this.attackRange + this.unitXVelocity - unitOppositeArr[unit].unitXPos - unitOppositeArr[unit].unitWidth
                    if (minSlicedStep === 0 && sliceStepCase) {
                        minSlicedStep = slicedStep
                        finalSlicedStepCase = true
                    }
                    else if (minSlicedStep >= slicedStep && sliceStepCase) {
                        minSlicedStep = slicedStep
                        finalSlicedStepCase = true
                    }
                }

                if (this.attackCase) {
                    this.finalAttackCase = this.attackCase
                }


                if (this.attackCase) {
                    damagedArr.push(unitOppositeArr[unit])
                }
                if (unitOppositeArr[unit].health <= 0) {
                    deadArr.push(unitOppositeArr[unit])
                }


                if (caseStop) {
                    sliceStepCase = false
                }


            }

            if (this.side === 'allies' && enemiesTower.health > 0) {
                this.attackBaseCase = this.unitXPos + this.unitWidth + this.attackRange >= enemiesTower.xTowerPos
                minTowerSlicedStep = this.unitXPos + this.unitWidth + this.attackRange + this.unitXVelocity - enemiesTower.xTowerPos
                if (minSlicedStep <= minTowerSlicedStep) {
                    minSlicedStep = minTowerSlicedStep
                    finalSlicedStepCase = true
                }
                minTowerDistance = enemiesTower.xTowerPos - this.unitXPos - this.unitWidth
                if (minDistance >= minTowerDistance || !minDistance) {
                    minDistance = minTowerDistance
                }
            }
            else if (this.side === 'enemies' && alliesTower.health > 0) {
                this.attackBaseCase = this.unitXPos - this.attackRange <= alliesTower.xTowerPos + alliesTower.towerWidth
                minTowerSlicedStep = this.unitXPos - this.attackRange + this.unitXVelocity - alliesTower.xTowerPos - alliesTower.towerWidth
                if (minSlicedStep >= minTowerSlicedStep) {
                    minSlicedStep = minTowerSlicedStep
                    finalSlicedStepCase = true
                }
                minTowerDistance = this.unitXPos - alliesTower.xTowerPos - alliesTower.towerWidth
                if (minDistance >= minTowerDistance || !minDistance) {
                    minDistance = minTowerDistance
                }
            }


            if (this.typeOfUnit === 'soldier') {


                function attackUnit(unit, damagedArr) {
                    if (unit.unitAttackPose <= unit.unitAnimation.length + 1 && unit.attackingNow && !unit.dead) {
                        unit.unitImg = unit.unitAnimation[unit.unitAttackPose - 1]
                        unit.unitAttackPose += 1
                    }
                    if (Number(unit.unitAttackPose) === unit.unitAnimation.length && unit.attackingNow && unit.finalAttackCase && !unit.dead) {
                        for (let j in damagedArr) {
                            damagedArr[j].health -= unit.attack
                            if (damagedArr[j].health <= 0) {
                                damagedArr[j].dead = false
                                if (damagedArr[j].side === 'allies') {
                                    deadAlliesUnit++
                                }
                                else if (damagedArr[j].side === 'enemies') {
                                    deadEnemiesUnit++
                                }
                            }
                        }
                    }
                    if (Number(unit.unitAttackPose) === unit.unitAnimation.length + 1 || !unit.finalAttackCase && !unit.attackingNow) {
                        unit.attackingNow = false
                        unit.unitAttackPose = 0
                        unit.unitWalkPose = 0
                    }
                }
                
                
                if (!this.unitAttackPose && this.finalAttackCase && !this.attackingBaseNow) {
                    this.attackingNow = true
                    this.unitImg = this.unitWalkAnimation[0]
                    this.unitAttackPose = 1
                    this.unitAttackStartTimeM = timeM
                }
                else if (!!this.unitAttackPose && !this.attackingBaseNow && timeM === Math.round(this.unitAttackStartTimeM + this.unitAttackPose * this.attackTime / 1000 * 20 / this.unitAnimation.length) ) {
                    attackUnit(this, damagedArr)
                    
                }
                caseStop = this.finalAttackCase

            }
                



            if (this.typeOfUnit === 'archer' || this.typeOfUnit === 'electricMage') {

                    
                function attackOneUnit(unit) {
                    if (unit.unitAttackPose <= unit.unitAnimation.length + 1 && unit.attackingNow && !unit.dead) {
                        unit.unitImg = unit.unitAnimation[unit.unitAttackPose - 1]
                        unit.unitAttackPose += 1
                    }
                    if (unit.typeOfUnit === 'archer') {
                        arrHalf = calcHalfArr(unit.unitAnimation)
                    }
                    else if (unit.typeOfUnit === 'electricMage') {
                        arrHalf = unit.unitAnimation.length
                    }
                    if (Number(unit.unitAttackPose) === arrHalf && unit.health > 0 && unit.attackingNow && unit.finalAttackCase && !unit.dead) {
                        shootProjectile(unit, maxVel, minDistance, heightDifference)
                    }
                    if (Number(unit.unitAttackPose) === unit.unitAnimation.length + 1 || !unit.finalAttackCase && !unit.attackingNow) {
                        unit.attackingNow = false
                        unit.unitAttackPose = 0
                        unit.unitWalkPose = 0
                    }
                }


                if (!this.unitAttackPose && this.finalAttackCase && !this.attackingBaseNow) {
                    this.attackingNow = true
                    this.unitImg = this.unitWalkAnimation[0]
                    this.unitAttackPose = 1
                    this.unitAttackStartTimeM = timeM
                }
                else if (!!this.unitAttackPose && !this.attackingBaseNow && timeM === Math.round(this.unitAttackStartTimeM + this.unitAttackPose * this.attackTime / 1000 * 60 / this.unitAnimation.length) ) {
                    attackOneUnit(this)
                    
                }
                    

                caseStop = this.finalAttackCase


            }


            
            function defineArrs(unit, unitOppositeArr) {
                if (unit.side === 'allies') {
                    unitEnemiesArr = unitOppositeArr
                }
                else if (unit.side === 'enemies') {
                    unitAlliesArr = unitOppositeArr
                }
            } 
            
            for (let i = deadArr.length-1; i >= 0; i--) {
                unitOppositeArr = unitOppositeArr.slice(0, deadArr[i]).concat(unitOppositeArr.slice(deadArr[i] + 1, unitOppositeArr.length))
                defineArrs(this, unitOppositeArr)
            }







            function attackBase(unit) {
                if (unit.typeOfUnit === 'soldier') {
                    if (unit.unitAttackPose <= unit.unitAnimation.length + 1 && unit.attackingBaseNow && !unit.dead) {
                        unit.unitImg = unit.unitAnimation[unit.unitAttackPose - 1]
                        unit.unitAttackPose += 1
                    }
                    if (Number(unit.unitAttackPose) === unit.unitAnimation.length && unit.attackingBaseNow && unit.attackBaseCase && !unit.dead) {
                        if (unit.side === 'allies') {
                            enemiesTower.health -= unit.attack
                        }
                        else if (unit.side === 'enemies') {
                            alliesTower.health -= unit.attack
                        }
                    }
                    if (Number(unit.unitAttackPose) === unit.unitAnimation.length + 1 || !unit.attackBaseCase && !unit.attackingBaseNow) {
                        unit.attackingBaseNow = false
                        unit.unitAttackPose = 0
                        unit.unitWalkPose = 0
                    }
                }


                else if (unit.typeOfUnit === 'archer' || unit.typeOfUnit === 'electricMage') {
                    if (unit.unitAttackPose <= unit.unitAnimation.length + 1 && unit.attackingBaseNow && !unit.dead) {
                        unit.unitImg = unit.unitAnimation[unit.unitAttackPose - 1]
                        unit.unitAttackPose += 1
                    }
                    if (unit.typeOfUnit === 'archer') {
                        arrHalf = calcHalfArr(unit.unitAnimation)
                    }
                    else if (unit.typeOfUnit === 'electricMage') {
                        arrHalf = unit.unitAnimation.length
                    }
                    if (Number(unit.unitAttackPose) === arrHalf && unit.attackingBaseNow && unit.attackBaseCase && !unit.dead) {
                        shootProjectile(unit, maxVel, minDistance, heightDifference)
                    }
                    if (Number(unit.unitAttackPose) === unit.unitAnimation.length + 1 || !unit.attackBaseCase && !unit.attackingBaseNow) {
                        unit.attackingBaseNow = false
                        unit.unitAttackPose = 0
                        unit.unitWalkPose = 0
                    }
                }
            }

            if (!this.unitAttackPose && this.attackBaseCase && !this.attackingNow) {
                this.attackingBaseNow = true
                this.unitImg = this.unitWalkAnimation[0]
                this.unitAttackPose = 1
                this.unitAttackStartTimeM = timeM
            }
            else if (!!this.unitAttackPose && !this.attackingNow && timeM === Math.round(this.unitAttackStartTimeM + this.unitAttackPose * this.attackTime / 1000 * 20 / this.unitAnimation.length) ) {
                attackBase(this)
                
            }

            if (!caseStop) {
                caseStop = this.attackBaseCase
            }


            
            if (finalSlicedStepCase && !gamePause) {
                this.unitXPos += this.unitXVelocity - minSlicedStep
            }
            else if (!caseStop && !finalSlicedStepCase && !this.attackingNow && !this.attackingBaseNow && !gamePause) {
                this.unitXPos += this.unitXVelocity
            }
            
            
            if (this.side === 'allies' && this.unitXPos >= battlefieldArea) {
                unitAlliesArr = killUnit(unitAlliesArr, this)
            }
            else if (this.side === 'enemies' && this.unitXPos + this.unitWidth <= 0) {
                unitEnemiesArr = killUnit(unitEnemiesArr, this)
            }


            if (caseStop) {
                
                if (this.side === 'allies') {
                    ctx.drawImage(this.unitImg, this.unitXPos + this.unitWidth - this.unitImg.width * this.unitScale + this.unitXTransition, this.unitYPos + this.unitHeight - this.unitImg.height * this.unitScale + this.unitYTransition, this.unitImg.width * this.unitScale, this.unitImg.height * this.unitScale)
                }
                else if (this.side === 'enemies') {
                    ctx.save()
                    ctx.translate(this.unitXPos, this.unitYPos)
                    ctx.scale( - 1, 1 )
                    ctx.translate( - this.unitXPos - this.unitWidth, - this.unitYPos)
                    ctx.drawImage(this.unitImg, this.unitXPos + this.unitWidth - this.unitImg.width * this.unitScale + this.unitXTransition, this.unitYPos + this.unitHeight - this.unitImg.height * this.unitScale + this.unitYTransition, this.unitImg.width * this.unitScale, this.unitImg.height * this.unitScale)
                    ctx.restore()
                }
            }
            else {


                function unitWalk(unit) {
                    if (unit.unitWalkPose <= unit.unitWalkAnimation.length + 1 && unit.walkingNow && !unit.dead) {
                        unit.unitImg = unit.unitWalkAnimation[unit.unitWalkPose - 1]
                        unit.unitWalkPose += 1
                    }
                    if (Number(unit.unitWalkPose) === unit.unitWalkAnimation.length + 1 && !unit.dead) {
                        unit.walkingNow = false
                        unit.unitWalkPose = 0
                    }
                }


                if (!this.unitWalkPose && !this.finalAttackCase && !this.attackingBaseNow) {
                    this.walkingNow = true
                    this.unitWalkPose = 1
                    this.unitWalkStartTimeM = timeM
                }
                else if (!!this.unitWalkPose && !this.finalAttackCase && !this.attackingBaseNow && timeM === Math.round(this.unitWalkStartTimeM + this.unitWalkPose * this.unitWalkTime / 1000 * 60 / this.unitWalkAnimation.length) ) {
                    unitWalk(this)
                }

                if (this.side === 'allies') {
                    ctx.drawImage(this.unitImg, this.unitXPos + this.unitWidth - this.unitImg.width * this.unitScale + this.unitXTransition, this.unitYPos + this.unitHeight - this.unitImg.height * this.unitScale + this.unitYTransition, this.unitImg.width * this.unitScale, this.unitImg.height * this.unitScale)
                }
                else if (this.side === 'enemies') {
                    ctx.save()
                    ctx.translate(this.unitXPos, this.unitYPos)
                    ctx.scale( - 1, 1 )
                    ctx.translate( - this.unitXPos - this.unitWidth, - this.unitYPos)
                    ctx.drawImage(this.unitImg, this.unitXPos + this.unitWidth - this.unitImg.width * this.unitScale + this.unitXTransition, this.unitYPos + this.unitHeight - this.unitImg.height * this.unitScale + this.unitYTransition, this.unitImg.width * this.unitScale, this.unitImg.height * this.unitScale)
                    ctx.restore()
                }

                // Хитбокс
                // ctx.fillStyle = 'rgba(0, 0, 0, .8)'
                // ctx.fillRect(this.unitXPos, this.unitYPos, this.unitWidth, this.unitHeight)

                // ctx.restore()

            }
        

        }







        die() {
            
            if (this.side === 'allies') {
                ctx.drawImage(this.unitImg, this.unitXPos + this.unitWidth - this.unitImg.width * this.unitScale + this.unitXTransition, this.unitYPos + this.unitHeight - this.unitImg.height * this.unitScale + this.unitYTransition, this.unitImg.width * this.unitScale, this.unitImg.height * this.unitScale)
            }
            else if (this.side === 'enemies') {
                ctx.save()
                ctx.translate(this.unitXPos, this.unitYPos)
                ctx.scale( - 1, 1 )
                ctx.translate( - this.unitXPos - this.unitWidth, - this.unitYPos)
                ctx.drawImage(this.unitImg, this.unitXPos + this.unitWidth - this.unitImg.width * this.unitScale + this.unitXTransition, this.unitYPos + this.unitHeight - this.unitImg.height * this.unitScale + this.unitYTransition, this.unitImg.width * this.unitScale, this.unitImg.height * this.unitScale)
                ctx.restore()
            }

            if (!this.dead) {
                this.dead = true
                this.unitDieTimeM = timeM
                this.unitDiePose = 1
                this.unitImg = this.unitDyingAnimation[0]
            }
            else if (timeM === Math.round(this.unitDieTimeM + this.unitDiePose * dieTime / 1000 * 60 / this.unitDyingAnimation.length) ) {
                this.unitImg = this.unitDyingAnimation[ this.unitDyingAnimation.indexOf(this.unitImg) + 1 ]
            }

        }







    }


































    class Projectile {


        constructor(sideOfProjectile = '', projectileXPos = 0, projectileYPos = 0, projectileXVelocity = 0, projectileYVelocity = 0, unit = 0, damage = 10, xCenter = 0, yCenter = 0) {
            this.sideOfProjectile = sideOfProjectile
            this.projectileXPos = projectileXPos
            this.projectileYPos = projectileYPos
            this.projectileXVelocity = projectileXVelocity
            this.projectileYVelocity = projectileYVelocity
            this.unit = unit
            this.damage = damage
            this.xCenter = xCenter
            this.yCenter = yCenter
        }

        draw() {
            ctx.fillStyle = 'black'
            let unitOppositeArr = false
            let attackProjectileCase = false
            let towerProjectileAttackCase = false
            let deadArr = []
            let projectileOurArr = []
            let damagedCase = false
            let angle = 0


            if (this.sideOfProjectile === 'enemies' && projectileWidth > 0) {
                projectileWidth *= -1
            }
            else if (this.sideOfProjectile === 'allies' && projectileWidth < 0) {
                projectileWidth *= -1
            }

            this.xCenter = this.projectileXPos + projectileWidth / 2
            this.yCenter = this.projectileYPos + projectileHieght / 2
            


            if (this.sideOfProjectile === 'allies' && !!unitEnemiesArr[0]) {
                unitOppositeArr = unitEnemiesArr
                projectileOurArr = projectileAllieArr
            }
            else if (this.sideOfProjectile === 'enemies' && !!unitAlliesArr[0]) {
                unitOppositeArr = unitAlliesArr
                projectileOurArr = projectileEnemieArr
            }


            

            for (let unit in unitOppositeArr) {
                if (this.sideOfProjectile === 'allies' && !!unitOppositeArr[unit]) {
                    attackProjectileCase = this.xCenter >= unitOppositeArr[unit].unitXPos && this.xCenter <= unitOppositeArr[unit].unitXPos + unitOppositeArr[unit].unitWidth && this.yCenter >= unitOppositeArr[unit].unitYPos && this.yCenter <= unitOppositeArr[unit].unitYPos + unitOppositeArr[unit].unitHeight
                }
                else if (this.sideOfProjectile === 'enemies' && !!unitOppositeArr[unit]) {
                    attackProjectileCase = this.xCenter <= unitOppositeArr[unit].unitXPos + unitOppositeArr[unit].unitWidth && this.xCenter >= unitOppositeArr[unit].unitXPos && this.yCenter >= unitOppositeArr[unit].unitYPos && this.yCenter <= unitOppositeArr[unit].unitYPos + unitOppositeArr[unit].unitHeight
                }

                if (attackProjectileCase && !damagedCase) {
                    unitOppositeArr[unit].health -= this.damage
                    if (unitOppositeArr[unit].health <= 0) {
                        unitOppositeArr[unit].dead = false
                        if (unitOppositeArr[unit].side === 'allies') {
                            deadAlliesUnit++
                        }
                        else if (unitOppositeArr[unit].side === 'enemies') {
                            deadEnemiesUnit++
                        }
                    }
                    projectileOurArr = destroyProjectile(projectileOurArr, this)
                    defineProjectileArrs(this, projectileOurArr)
                    damagedCase = true
                }


            }



            
            function defineArrs(projectile, unitOppositeArr) {
                if (projectile.sideOfProjectile === 'allies') {
                    unitEnemiesArr = unitOppositeArr
                }
                else if (projectile.sideOfProjectile === 'enemies') {
                    unitAlliesArr = unitOppositeArr
                }
            }

            function defineProjectileArrs(projectile, projectileOurArr) {
                if (projectile.sideOfProjectile === 'allies') {
                    projectileAllieArr = projectileOurArr
                }
                else if (projectile.sideOfProjectile === 'enemies') {
                    projectileEnemieArr = projectileOurArr
                }
            }
            

            for (let i = deadArr.length-1; i >= 0; i--) {
                unitOppositeArr = unitOppositeArr.slice(0, deadArr[i]).concat(unitOppositeArr.slice(deadArr[i] + 1, unitOppositeArr.length))
                defineArrs(this, unitOppositeArr)
            }




            if (this.sideOfProjectile === 'allies') {
                towerProjectileAttackCase = this.xCenter >= enemiesTower.xTowerPos && this.xCenter <= enemiesTower.xTowerPos + enemiesTower.towerWidth && this.yCenter >= enemiesTower.yTowerPos + enemiesTower.towerHeight && this.yCenter <= enemiesTower.yTowerPos
            }
            else if (this.sideOfProjectile === 'enemies') {
                towerProjectileAttackCase = this.xCenter >= alliesTower.xTowerPos && this.xCenter <= alliesTower.xTowerPos + alliesTower.towerWidth && this.yCenter >= alliesTower.yTowerPos + alliesTower.towerHeight && this.yCenter <= alliesTower.yTowerPos
            }
            if (this.sideOfProjectile === 'allies' && towerProjectileAttackCase && enemiesTower.health > 0) {
                enemiesTower.health -= this.damage
                projectileAllieArr = destroyProjectile(projectileAllieArr, this)
            }
            else if (this.sideOfProjectile === 'enemies' && towerProjectileAttackCase && alliesTower.health > 0) {
                alliesTower.health -= this.damage
                projectileEnemieArr = destroyProjectile(projectileEnemieArr, this)
            }






            if (this.xCenter <= 0 - projectileWidth || this.xCenter >= battlefieldArea - projectileWidth || this.yCenter >= canvas.height - controlSectionHeight - controlSectionLineWidth - projectileHieght) {
                if (this.sideOfProjectile === 'allies') {
                    projectileAllieArr = destroyProjectile(projectileAllieArr, this)
                }
                else if (this.sideOfProjectile === 'enemies') {
                    projectileEnemieArr = destroyProjectile(projectileEnemieArr, this)
                }
            }

           
            ctx.save()
            angle = Math.atan(this.projectileYVelocity / this.projectileXVelocity)
            ctx.translate(this.xCenter, this.yCenter)
            ctx.rotate(angle)
            ctx.translate( - this.xCenter, - this.yCenter)

            if (this.unit.typeOfUnit === 'archer') {
                if (this.sideOfProjectile === 'allies') {
                    ctx.beginPath()
                    ctx.moveTo(this.xCenter, this.yCenter)
                    ctx.moveTo(this.xCenter - projectileL, this.yCenter - projectileW)
                    ctx.lineTo(this.xCenter + projectileL, this.yCenter - projectileW)
                    ctx.lineTo(this.xCenter + projectileL, this.yCenter - projectileW - arrowW)
                    ctx.lineTo(this.xCenter + projectileL + arrowL, this.yCenter)
                    ctx.lineTo(this.xCenter + projectileL, this.yCenter + projectileW + arrowW)
                    ctx.lineTo(this.xCenter + projectileL, this.yCenter + projectileW)
                    ctx.lineTo(this.xCenter - projectileL, this.yCenter + projectileW)
                    ctx.fill()    
                }
                else if (this.sideOfProjectile === 'enemies') {
                    ctx.beginPath()
                    ctx.moveTo(this.xCenter, this.yCenter)
                    ctx.moveTo(this.xCenter + projectileL, this.yCenter - projectileW)
                    ctx.lineTo(this.xCenter - projectileL, this.yCenter - projectileW)
                    ctx.lineTo(this.xCenter - projectileL, this.yCenter - projectileW - arrowW)
                    ctx.lineTo(this.xCenter - projectileL - arrowL, this.yCenter)
                    ctx.lineTo(this.xCenter - projectileL, this.yCenter + projectileW + arrowW)
                    ctx.lineTo(this.xCenter - projectileL, this.yCenter + projectileW)
                    ctx.lineTo(this.xCenter + projectileL, this.yCenter + projectileW)
                    ctx.fill()    
                }
            }
            else if (this.unit.typeOfUnit === 'electricMage') {
                if (this.sideOfProjectile === 'allies') {
                    ctx.drawImage(imgElectricProjectile, this.projectileXPos + imgElectricProjectile.width / 2 - imgElectricProjectile.width * .5 / 2, this.projectileYPos  + imgElectricProjectile.height / 2 - imgElectricProjectile.height * .5 / 2, imgElectricProjectile.width * .5, imgElectricProjectile.height * .5)
                }
                else if (this.sideOfProjectile === 'enemies') {
                    ctx.drawImage(imgElectricProjectile, this.projectileXPos + imgElectricProjectile.width / 2 - imgElectricProjectile.width * .5 / 2, this.projectileYPos  + imgElectricProjectile.height / 2 - imgElectricProjectile.height * .5 / 2, imgElectricProjectile.width * .5, imgElectricProjectile.height * .5)
                }
            }
            else if (!this.unit) {
                ctx.beginPath()
                ctx.moveTo(this.xCenter, this.yCenter)
                ctx.moveTo(this.xCenter - projectileL, this.yCenter - projectileW)
                ctx.lineTo(this.xCenter + projectileL, this.yCenter - projectileW)
                ctx.lineTo(this.xCenter + projectileL, this.yCenter - projectileW - arrowW)
                ctx.lineTo(this.xCenter + projectileL + arrowL, this.yCenter)
                ctx.lineTo(this.xCenter + projectileL, this.yCenter + projectileW + arrowW)
                ctx.lineTo(this.xCenter + projectileL, this.yCenter + projectileW)
                ctx.lineTo(this.xCenter - projectileL, this.yCenter + projectileW)
                ctx.fill()
            }
        

            ctx.restore()


            if (!gamePause) {
                if (this.unit.typeOfUnit === 'archer') {
                    this.projectileXPos += this.projectileXVelocity
                    this.projectileYPos += this.projectileYVelocity
                    this.projectileYVelocity += GAcceleration
                }
                else if (this.unit.typeOfUnit === 'electricMage') {
                    this.projectileXPos += this.projectileXVelocity
                }
                else if (!this.unit) {
                    this.projectileXPos += this.projectileXVelocity
                    this.projectileYPos += this.projectileYVelocity
                    this.projectileYVelocity += GAcceleration
                }    
            }
            
        }


    }
































    


    // Main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main

    // Конец игры
    let endOfGame = false
    let weakling = ''

    // Статистика во время боя
    let unitAllies = 0
    let unitEnemies = 0
    let unitNumberDistance = 400

    // Статистика после боя
    let deadAlliesUnit = 0
    let deadEnemiesUnit = 0
    let statisticsCase = false
    let text = ''
    let statisticsDelay = 0
    let statisticsWindowWidth = 400
    let statisticsWindowHeight = 600

    // Пауза
    let gamePause = false
    let pauseButtonColor = 'green'
    let gameFrame

    // Разное
    const controlSectionHeight = 100
    const gameAreaHeight = canvas.height - controlSectionHeight
    const milisecPerFrame = 1000 / 60
    const milisecTosec = .001
    const GAcceleration = 9.81 * milisecTosec * 4

    // Смерть юнита
    const dieTime = 1000

    // Параметры поля боя
    let xTranslate = 0
    const battlefieldArea = canvas.width + 400

    // Мана
    let totalMana = 9999
    let maxMana = totalMana
    let mana = 0
    let manaIncome = 1000
    let manaOld = 0
    let manaDecreaseRate = 50

    // Кнопки
    const buttonWidth = 20
    const buttonHeight = 20
    const buttonRadius = buttonWidth / 2
    const unitButtonInterval = buttonWidth + 20
    const unitButtonStartXPos1 = 80
    const unitButtonStartXPos2 = unitButtonStartXPos1 + unitButtonInterval
    const unitButtonStartXPos3 = unitButtonStartXPos2 + unitButtonInterval
    const unitButtonStartXPos4 = unitButtonStartXPos3 + unitButtonInterval
    const unitButtonStartXPos5 = unitButtonStartXPos4 + unitButtonInterval
    const unitButtonStartXPos6 = unitButtonStartXPos5 + unitButtonInterval
    const unitButtonStartXPos7 = unitButtonStartXPos6 + unitButtonInterval
    const unitButtonStartYPos = 20

    const unitButtonStartXPosArr = [ unitButtonStartXPos1, unitButtonStartXPos2, unitButtonStartXPos3, unitButtonStartXPos4, unitButtonStartXPos5, unitButtonStartXPos6, unitButtonStartXPos7 ]

    // Кулдаун
    const cooldownTime1 = 1000
    let time1 = 0
    let cooldownAdd = 1
    let cooldownAngle = time1 / cooldownTime1 * Math.PI * 2

    let soldierCooldownCase = false
    let archerCooldownCase = false
    let clericCooldownCase = false
    let heavySoldierCooldownCase = false
    let crossbowmanCooldownCase = false
    let electricMageCooldownCase = false
    let paladinCooldownCase = false

    let unitCooldownCaseArr = [ soldierCooldownCase, archerCooldownCase, clericCooldownCase, heavySoldierCooldownCase, crossbowmanCooldownCase, electricMageCooldownCase, paladinCooldownCase ]

    let soldierCooldownCurrentTime = 0
    let archerCooldownCurrentTime = 0
    let clericCooldownCurrentTime = 0
    let heavySoldierCooldownCurrentTime = 0
    let crossbowmanCooldownCurrentTime = 0
    let electricMageCooldownCurrentTime = 0
    let paladinCooldownCurrentTime = 0

    let unitCoolDownCurrentTimeArr = [ soldierCooldownCurrentTime, archerCooldownCurrentTime, clericCooldownCurrentTime, heavySoldierCooldownCurrentTime, crossbowmanCooldownCurrentTime, electricMageCooldownCurrentTime, paladinCooldownCurrentTime ]

    const soldierCooldownTime = 100
    const archerCooldownTime = 100
    const clericCooldownTime = 100
    const heavySoldierCooldownTime = 100
    const crossbowmanCooldownTime = 100
    const electricMageCooldownTime = 100
    const paladinCooldownTime = 100

    let unitCoolDownTimeArr = [ soldierCooldownTime, archerCooldownTime, clericCooldownTime, heavySoldierCooldownTime, crossbowmanCooldownTime, electricMageCooldownTime, paladinCooldownTime ]

    // Информация о юните
    let soldierInformationCase = false
    let archerInformationCase = false
    let clericInformationCase = false
    let heavySoldierInformationCase = false
    let crossbowmanInformationCase = false
    let electricMageInformationCase = false
    let paladinInformationCase = false

    const unitInformationCase = [soldierInformationCase, archerInformationCase, clericInformationCase, heavySoldierInformationCase, crossbowmanInformationCase, electricMageInformationCase, paladinInformationCase]

    let unitInfoText = ''
    let unitInfoTextWidth = 0

    const unitInfoWindowWidth = 530
    const unitInfoWindowHeight = 80

    // Стрелы
    let projectileWidth = 4
    let projectileHieght = 4
    let balistaProjectileWidth = 6
    let balistaProjectileHeight = 6
    let maxVel = 6

    let projectileL = 3
    let projectileW = .5
    let arrowL = 5
    let arrowW = .5

    // Балиста
    let angleStep = ((Math.PI / 180) * 100)
    let balistaProjectileMaxVelocity = 6
    let balistaAttackingCase = false
    let balistaAttackStartTimeM = 0
    let balistaReloadTimeM = 30

    let timeM = 0
    let timeS = 0
    












    function controlSection(xTranslate) {

        // Рамка управления
        ctx.save()
        controlSectionLineWidth = 2
        ctx.lineWidth = controlSectionLineWidth
        ctx.strokeStyle = 'black'
        ctx.strokeRect(0 + xTranslate, canvas.height - controlSectionHeight, canvas.width, controlSectionHeight)
        ctx.restore()

        // Рамка маны
        ctx.save()
        ctx.lineWidth = 2
        ctx.strokeStyle = 'black'
        ctx.strokeRect(canvas.width / 2 - 120 + xTranslate, canvas.height - controlSectionHeight, 240, 40)
        ctx.restore()

        // Мана
        ctx.save()
        ctx.lineWidth = 2
        ctx.textAlign = 'center'
        ctx.fillStyle = 'rgba(0, 255, 255, .6)'
        ctx.fillRect(canvas.width / 2 - 120 + xTranslate, canvas.height - controlSectionHeight, 240 * manaOld / maxMana, 40)
        ctx.fillStyle = 'rgba(0, 255, 255, 1)'
        ctx.fillRect(canvas.width / 2 - 120 + xTranslate, canvas.height - controlSectionHeight, 240 * mana / maxMana, 40)
        if (manaOld - manaDecreaseRate >= mana) {
            manaOld -= manaDecreaseRate
        }
        else if (manaOld - manaDecreaseRate < mana) {
            manaOld = mana
        }
        // manaOld = mana
        ctx.restore()

        // Мана колическтво
        ctx.save()
        let manaFontSize = 16
        ctx.fillStyle = 'black'
        ctx.font = manaFontSize + 'px serif'
        let manaText = mana + ' / ' + totalMana
        text = ctx.measureText(manaText)
        let manaTextWidth = text.width
        ctx.fillText(manaText, canvas.width / 2 - manaTextWidth / 2 + xTranslate, canvas.height - controlSectionHeight + manaFontSize)
        ctx.restore()

        // Рамка маны
        // ctx.save()
        // ctx.lineWidth = 2
        // ctx.strokeStyle = 'black'
        // // ctx.fillStyle = 'blue'
        // ctx.strokeRect(canvas.width / 2 - 115 + xTranslate, canvas.height - controlSectionHeight + 5, 230, 30)
        // ctx.restore()

        // Задний план
        ctx.save()
        let lingrad = ctx.createLinearGradient(0, 0, battlefieldArea, 0)
        lingrad.addColorStop(0, '#FFFFFF')
        lingrad.addColorStop(0.5, '#000000')
        lingrad.addColorStop(0.5, '#000000')
        lingrad.addColorStop(1, '#FF0000')
        ctx.fillStyle = lingrad
        ctx.fillRect(0 + xTranslate, 0, canvas.width, canvas.height - controlSectionHeight)
        ctx.restore()

        // Поле боя
        ctx.save()
        ctx.fillStyle = '#FF8000'
        ctx.fillRect(0, canvas.height - controlSectionHeight - 60, battlefieldArea, 60)
        ctx.restore()

        // Количество юнитов
        ctx.save()
        let unitNumberTextSize = 16
        ctx.fillStyle = 'black'
        ctx.font = unitNumberTextSize + 'px serif'

        unitAllies = unitAlliesArr.length
        unitEnemies = unitEnemiesArr.length

        let unitNumberText = unitAllies
        text = ctx.measureText(unitNumberText)
        let unitNumberTextWidth = text.width
        ctx.fillText(unitNumberText, unitNumberDistance - unitNumberTextWidth / 2 + xTranslate, 20 + unitNumberTextSize)

        unitNumberText = unitEnemies
        text = ctx.measureText(unitNumberText)
        unitNumberTextWidth = text.width
        ctx.fillText(unitNumberText, canvas.width - unitNumberDistance - unitNumberTextWidth / 2 + xTranslate, 20 + unitNumberTextSize)

        ctx.restore()  

        // Пауза
        ctx.save()
        ctx.fillStyle = pauseButtonColor
        ctx.beginPath()
        ctx.arc(canvas.width / 2 + xTranslate + buttonWidth / 2, 20 + buttonHeight / 2, buttonWidth / 2, 0, Math.PI * 2, true)
        ctx.fill()
        ctx.restore()

        // Кулдаун


        function coolDown(unitButtonStartXPos, cooldownTime, time) {
            ctx.save()
            ctx.fillStyle = 'rgba(0, 0, 0, .6)'
            cooldownAngle = time / cooldownTime * Math.PI
            ctx.beginPath()
            ctx.arc(unitButtonStartXPos + xTranslate + buttonWidth / 2, canvas.height - controlSectionHeight + unitButtonStartYPos + buttonHeight / 2, buttonWidth / 2, - Math.PI / 2 - cooldownAngle, - Math.PI / 2 + cooldownAngle, true)
            ctx.fill()
            ctx.restore()
        }

        function drawButton(unit) {
            ctx.save()
            ctx.fillStyle = 'green'
            ctx.beginPath()
            ctx.arc(unitButtonStartXPosArr[unit] + xTranslate + buttonWidth / 2, canvas.height - controlSectionHeight + unitButtonStartYPos + buttonHeight / 2, buttonWidth / 2, 0, Math.PI * 2, true)
            ctx.fill()
            ctx.restore()
        }
        
        function unitCoolDown(unit) {

            if (unitCooldownCaseArr[unit]) {
                if (unitCoolDownCurrentTimeArr[unit] < unitCoolDownTimeArr[unit]) {
                    coolDown(unitButtonStartXPosArr[unit], unitCoolDownTimeArr[unit], unitCoolDownCurrentTimeArr[unit])
                    unitCoolDownCurrentTimeArr[unit] += cooldownAdd
                }
                else {
                    unitCoolDownCurrentTimeArr[unit] = 0
                    unitCooldownCaseArr[unit] = false
                }
            }

        }

        for ( let i = 0; i <= 6; i++ ) {
            drawButton(i)
            unitCoolDown(i)
        }



        // Информация о юните

        for (unit in unitInformationCase) {
            if (unitInformationCase[unit]) {
                ctx.save()
                ctx.fillStyle = 'black'
                ctx.fillRect(canvas.width - unitInfoWindowWidth - 10 + xTranslate, gameAreaHeight + 10, unitInfoWindowWidth, unitInfoWindowHeight)
    
                unitInfoFontSize = 16
                ctx.fillStyle = 'white'
                ctx.font = unitInfoFontSize + 'px serif'
    
                unitInfoText = 'Здоровье: ' + unitHealthArr[unit]
                text = ctx.measureText(unitInfoText)
                unitInfoTextWidth = text.width
                ctx.fillText(unitInfoText, canvas.width - unitInfoWindowWidth + 10 + xTranslate, gameAreaHeight + 30)
    
                unitInfoText = 'Атака: ' + unitAttackArr[unit]
                text = ctx.measureText(unitInfoText)
                unitInfoTextWidth = text.width
                ctx.fillText(unitInfoText, canvas.width - unitInfoWindowWidth + 10 + xTranslate, gameAreaHeight + 50)
    
                unitInfoText = 'Защита: ' + unitDefenceArr[unit]
                text = ctx.measureText(unitInfoText)
                unitInfoTextWidth = text.width
                ctx.fillText(unitInfoText, canvas.width - unitInfoWindowWidth + 10 + xTranslate, gameAreaHeight + 70)
    
    
    
                ctx.restore()
            }
        }


    }












    // endOfGame = true
    // weakling = 'allie'

    function gameEnding(weakling) {
        statisticsDelay = 1000
        setTimeout(() => {statisticsCase = true}, statisticsDelay)
        if (weakling === 'allie') {
            ctx.save()
            let endGameTextSize = 48
            ctx.fillStyle = 'black'
            ctx.font = endGameTextSize + 'px serif'
            endGameText = 'Doom to us all'
            text = ctx.measureText(endGameText)
            let endGameTextWidth = text.width
            ctx.fillText(endGameText, canvas.width / 2 - endGameTextWidth / 2 + xTranslate, canvas.height / 2 + endGameTextSize)
            ctx.restore()    
        }
        else if (weakling === 'enemie') {
            ctx.save()
            let endGameTextSize = 48
            ctx.fillStyle = 'green'
            ctx.font = endGameTextSize + 'px serif'
            endGameText = 'Death cheated'
            text = ctx.measureText(endGameText)
            let endGameTextWidth = text.width
            ctx.fillText(endGameText, canvas.width / 2 - endGameTextWidth / 2 + xTranslate, canvas.height / 2 + endGameTextSize)
            ctx.restore()
        }
    }


    function statistics() {
        ctx.save()
        if (weakling === 'allie') {
            ctx.fillStyle = 'red'
        }
        else if (weakling === 'enemie') {
            ctx.fillStyle = 'green'
        }
        ctx.fillRect(canvas.width / 2 - statisticsWindowWidth / 2 + xTranslate, (canvas.height - controlSectionHeight) / 2 - statisticsWindowHeight / 2, statisticsWindowWidth, statisticsWindowHeight)
        let statisticsDeadAllieUnit = deadAlliesUnit
        let statisticsDeadEnemieUnit = deadEnemiesUnit
        let statisticsTextSize = 24
        ctx.fillStyle = 'black'
        ctx.font = statisticsTextSize + 'px serif'
        ctx.textAlign = 'start'


        statisticsDeadAllieUnitText = 'Погибло союзников: ' + statisticsDeadAllieUnit
        text = ctx.measureText(statisticsDeadAllieUnitText)
        let statisticsDeadAllieUnitTextWidth = text.width
        ctx.fillText(statisticsDeadAllieUnitText, canvas.width / 2 - statisticsWindowWidth / 2 + 40 + xTranslate, canvas.height / 2 + statisticsTextSize - statisticsWindowHeight / 2)


        statisticsDeadEnemieUnitText = 'Погибло противников: ' + statisticsDeadEnemieUnit
        text = ctx.measureText(statisticsDeadEnemieUnitText)
        let statisticsDeadEnemieUnitTextWidth = text.width
        ctx.fillText(statisticsDeadEnemieUnitText, canvas.width / 2 - statisticsWindowWidth / 2 + 40 + xTranslate, canvas.height / 2 + statisticsTextSize - statisticsWindowHeight / 2 + statisticsTextSize)

        ctx.restore()
    }



    const currentTowerWidth = 60
    const currentTowerHeight = -200
    const totalTowerHealth = 1000
    const currenttowerHealth = 1000
    const towerFarness = 40




    const alliesTower = new Tower(health = currenttowerHealth, totalHealth = totalTowerHealth,  0, gameAreaHeight - towerFarness, currentTowerWidth, totalTowerHeight = currentTowerHeight, currentTowerHeight, 'black', 'allies')
    const enemiesTower = new Tower(health = currenttowerHealth, totalHealth = totalTowerHealth, battlefieldArea - currentTowerWidth, gameAreaHeight - towerFarness, currentTowerWidth, totalTowerHeight = currentTowerHeight, currentTowerHeight, 'black', 'enemies')





    


    let unitAlliesArr = []
    let unitEnemiesArr = []
    let projectileAllieArr = []
    let projectileEnemieArr = []
    let corpsesArr = []

    const unitFarness = 30

    let imgElectricProjectile = new Image()
    imgElectricProjectile.src = '/img/Игра/Снаряды/Электрический разряд.png'

    
    function makeImgForFrames(animation, animationFrames, walkAnimation, walkAnimationFrames, dyingAnimation, dyingAnimationFrames, unitName) {

        for ( let unitFrames = 1; unitFrames <= animationFrames; unitFrames++ ) {
            let img = new Image()
            img.addEventListener('load', function() {
                animation[unitFrames - 1] = img
            }, false);
            img.src = '/img/Игра/' + unitName +'/' + unitName +' атакует ' + unitFrames + '.png'
        }


        for ( let unitFrames = 1; unitFrames <= walkAnimationFrames; unitFrames++ ) {
            let img = new Image()
            img.addEventListener('load', function() {
                walkAnimation[unitFrames - 1] = img
            }, false);
            img.src = '/img/Игра/' + unitName +'/' + unitName +' идет ' + unitFrames + '.png'
        }


        for ( let unitFrames = 1; unitFrames <= dyingAnimationFrames; unitFrames++ ) {
            let img = new Image()
            img.addEventListener('load', function() {
                dyingAnimation[unitFrames - 1] = img
            }, false);
            img.src = '/img/Игра/' + unitName +'/' + unitName +' умирает ' + unitFrames + '.png'
        }
    }


    // Солдат
    const soldierAttackRange = 6
    const soldierHealth = 60
    const soldierAttack = 10
    const soldierDefence = 0
    const soldierManaRequest = 30
    const soldierXvelocity = 2
    const soldierWidth = 16
    const soldierHeight = 34
    const soldierAttackTime = 4000
    const soldierAnimation = []
    const soldierWalkAnimation = []
    const soldierDyingAnimation = []
    const soldierAnimationFrameAmount = 5
    const soldierWalkAnimationFrameAmount = 4
    const soldierDyingAnimationFrameAmount = 2
    const soldierWalkTime = 1000
    const soldierType = 'soldier'
    const soldierName = 'Солдат'
    const soldierScale = .25
    const soldierXTransition = 16
    const soldierYTransition = 6

    // Лучник
    const archerAttackRange = 600
    const archerHealth = 40
    const archerAttack = 10
    const archerDefence = 0
    const archerManaRequest = 50
    const archerXvelocity = 2
    const archerWidth = 16
    const archerHeight = 34
    const archerAttackTime = 2000
    const archerAnimation = []
    const archerWalkAnimation = []
    const archerDyingAnimation = []
    const archerAnimationFrameAmount = 5
    const archerWalkAnimationFrameAmount = 4
    const archerDyingAnimationFrameAmount = 2
    const archerWalkTime = 1000
    const archerType = 'archer'
    const archerName = 'Лучник'
    const archerScale = .25
    const archerXTransition = 16
    const archerYTransition = 6

    // Клирик
    const clericAttackRange = 600
    const clericHealth = 40
    const clericAttack = 10
    const clericDefence = 0
    const clericManaRequest = 100
    const clericXvelocity = 2
    const clericWidth = 16
    const clericHeight = 34
    const clericAttackTime = 2000
    const clericAnimation = []
    const clericWalkAnimation = []
    const clericDyingAnimation = []
    const clericAnimationFrameAmount = 5
    const clericWalkAnimationFrameAmount = 4
    const clericDyingAnimationFrameAmount = 2
    const clericWalkTime = 1000
    const clericType = 'soldier'
    const clericName = 'Клирик'
    const clericScale = .25
    const clericXTransition = 16
    const clericYTransition = 6

    // Тяжелый солдат
    const heavySoldierAttackRange = 6
    const heavySoldierHealth = 200
    const heavySoldierAttack = 20
    const heavySoldierDefence = 0
    const heavySoldierManaRequest = 150
    const heavySoldierXvelocity = 1
    const heavySoldierWidth = 16
    const heavySoldierHeight = 36
    const heavySoldierAttackTime = 2000
    const heavySoldierAnimation = []
    const heavySoldierWalkAnimation = []
    const heavySoldierDyingAnimation = []
    const heavySoldierAnimationFrameAmount = 5
    const heavySoldierWalkAnimationFrameAmount = 4
    const heavySoldierDyingAnimationFrameAmount = 2
    const heavySoldierWalkTime = 1000
    const heavySoldierType = 'soldier'
    const heavySoldierName = 'Тяжелый солдат'
    const heavySoldierScale = .25
    const heavySoldierXTransition = 16
    const heavySoldierYTransition = 10

    // Арбалетчик
    const crossbowmanAttackRange = 600
    const crossbowmanHealth = 200
    const crossbowmanAttack = 20
    const crossbowmanDefence = 0
    const crossbowmanManaRequest = 200
    const crossbowmanXvelocity = 2
    const crossbowmanWidth = 40
    const crossbowmanHeight = 40
    const crossbowmanAttackTime = 2000
    const crossbowmanAnimation = []
    const crossbowmanWalkAnimation = []
    const crossbowmanDyingAnimation = []
    const crossbowmanAnimationFrameAmount = 5
    const crossbowmanWalkAnimationFrameAmount = 4
    const crossbowmanDyingAnimationFrameAmount = 2
    const crossbowmanWalkTime = 1000
    const crossbowmanType = 'archer'
    const crossbowmanName = 'Арбалетчик'
    const crossbowmanScale = .25
    const crossbowmanXTransition = 20
    const crossbowmanYTransition = 10

    // Электрический маг
    const electricMageAttackRange = 600
    const electricMageHealth = 40
    const electricMageAttack = 40
    const electricMageDefence = 0
    const electricMageManaRequest = 300
    const electricMageXvelocity = 4
    const electricMageWidth = 16
    const electricMageHeight = 36
    const electricMageAttackTime = 2000
    const electricMageAnimation = []
    const electricMageWalkAnimation = []
    const electricMageDyingAnimation = []
    const electricMageAnimationFrameAmount = 5
    const electricMageWalkAnimationFrameAmount = 4
    const electricMageDyingAnimationFrameAmount = 2
    const electricMageWalkTime = 1000
    const electricMageType = 'electricMage'
    const electricMageName = 'Электрический маг'
    const electricMageScale = .25
    const electricMageXTransition = 20
    const electricMageYTransition = 14

    // Паладин
    const paladinAttackRange = 6
    const paladinHealth = 600
    const paladinAttack = 40
    const paladinDefence = 0
    const paladinManaRequest = 500
    const paladinXvelocity = 4
    const paladinWidth = 40
    const paladinHeight = 40
    const paladinAttackTime = 2000
    const paladinAnimation = []
    const paladinWalkAnimation = []
    const paladinDyingAnimation = []
    const paladinAnimationFrameAmount = 5
    const paladinWalkAnimationFrameAmount = 4
    const paladinDyingAnimationFrameAmount = 2
    const paladinWalkTime = 1000
    const paladinType = 'soldier'
    const paladinName = 'Паладин'
    const paladinScale = .25
    const paladinXTransition = 20
    const paladinYTransition = 10

    const unitHealthArr = [soldierHealth, archerHealth, clericHealth, heavySoldierHealth, crossbowmanHealth, electricMageHealth, paladinHealth]
    const unitAttackArr = [soldierAttack, archerAttack, clericAttack, heavySoldierAttack, crossbowmanAttack, electricMageAttack, paladinAttack]
    const unitAttackRange = [soldierAttackRange, archerAttackRange, clericAttackRange, heavySoldierAttackRange, crossbowmanAttackRange, electricMageAttackRange, paladinAttackRange]
    const unitDefenceArr = [soldierDefence, archerDefence, clericDefence, heavySoldierDefence, crossbowmanDefence, electricMageDefence, paladinDefence]
    const unitManaRequestArr = [soldierManaRequest, archerManaRequest, clericManaRequest, heavySoldierManaRequest, crossbowmanManaRequest, electricMageManaRequest, paladinManaRequest]
    const unitXVelocityArr = [soldierXvelocity, archerXvelocity, clericXvelocity, heavySoldierXvelocity, crossbowmanXvelocity, electricMageXvelocity, paladinXvelocity]
    const unitWidthArr = [soldierWidth, archerWidth, clericWidth, heavySoldierWidth, crossbowmanWidth, electricMageWidth, paladinWidth]
    const unitHeightArr = [soldierHeight, archerHeight, clericHeight, heavySoldierHeight, crossbowmanHeight, electricMageHeight, paladinHeight]
    const unitAttackTimeArr = [soldierAttackTime, archerAttackTime, clericAttackTime, heavySoldierAttackTime, crossbowmanAttackTime, electricMageAttackTime, paladinAttackTime]
    const unitAnimationArr = [soldierAnimation, archerAnimation, clericAnimation, heavySoldierAnimation, crossbowmanAnimation, electricMageAnimation, paladinAnimation]
    const unitWalkAnimationArr = [soldierWalkAnimation, archerWalkAnimation, clericWalkAnimation, heavySoldierWalkAnimation, crossbowmanWalkAnimation, electricMageWalkAnimation, paladinWalkAnimation]
    const unitDyingAnimationArr = [soldierDyingAnimation, archerDyingAnimation, clericDyingAnimation, heavySoldierDyingAnimation, crossbowmanDyingAnimation, electricMageDyingAnimation, paladinDyingAnimation]
    const unitAnimationFrameAmountArr = [soldierAnimationFrameAmount, archerAnimationFrameAmount, clericAnimationFrameAmount, heavySoldierAnimationFrameAmount, crossbowmanAnimationFrameAmount, electricMageAnimationFrameAmount, paladinAnimationFrameAmount]
    const unitWalkAnimationFrameAmountArr = [soldierWalkAnimationFrameAmount, archerWalkAnimationFrameAmount, clericWalkAnimationFrameAmount, heavySoldierWalkAnimationFrameAmount, crossbowmanWalkAnimationFrameAmount, electricMageWalkAnimationFrameAmount, paladinWalkAnimationFrameAmount]
    const unitDyingAnimationFrameAmountArr = [soldierDyingAnimationFrameAmount, archerDyingAnimationFrameAmount, clericDyingAnimationFrameAmount, heavySoldierDyingAnimationFrameAmount, crossbowmanDyingAnimationFrameAmount, electricMageDyingAnimationFrameAmount, paladinDyingAnimationFrameAmount]
    const unitWalkTimeArr = [soldierWalkTime, archerWalkTime, clericWalkTime, heavySoldierWalkTime, crossbowmanWalkTime, electricMageWalkTime, paladinWalkTime]
    const unitTypeArr = [soldierType, archerType, clericType, heavySoldierType, crossbowmanType, electricMageType, paladinType]
    const unitNameArr = [soldierName, archerName, clericName, heavySoldierName, crossbowmanName, electricMageName, paladinName]
    const unitScaleArr = [soldierScale, archerScale, clericScale, heavySoldierScale, crossbowmanScale, electricMageScale, paladinScale]
    const unitXTransitionArr = [soldierXTransition, archerXTransition, clericXTransition, heavySoldierXTransition, crossbowmanXTransition, electricMageXTransition, paladinXTransition]
    const unitYTransitionArr = [soldierYTransition, archerYTransition, clericYTransition, heavySoldierYTransition, crossbowmanYTransition, electricMageYTransition, paladinYTransition]

    for (let i = 0; i <= 6; i++) {
        makeImgForFrames(unitAnimationArr[i], unitAnimationFrameAmountArr[i], unitWalkAnimationArr[i], unitWalkAnimationFrameAmountArr[i], unitDyingAnimationArr[i], unitDyingAnimationFrameAmountArr[i], unitNameArr[i])
    }


    function makeAllieUnit(unitSide, unit) {
        return newUnit = new Unit(health = unitHealthArr[unit], attack = unitAttackArr[unit], attackRange = unitAttackRange[unit], defence = unitDefenceArr[unit], manaUnitRequest = unitManaRequestArr[unit], unitXPos = 0 - unitWidthArr[unit], unitYPos = gameAreaHeight - unitHeightArr[unit] - unitFarness, unitXVelocity = unitXVelocityArr[unit], unitWidth = unitWidthArr[unit], unitHeight = unitHeightArr[unit], color = 'green', unitImg = unitWalkAnimationArr[unit][1], side = unitSide, attackingNow = false, attackTime = unitAttackTimeArr[unit], unitAnimation = unitAnimationArr[unit], unitWalkAnimation = unitWalkAnimationArr[unit], unitWalkTime = unitWalkTimeArr[unit], unitWalkPose = 0, walkingNow = false, typeOfUnit = unitTypeArr[unit], attackingBaseNow = false, attackCase = false, attackBaseCase = false, finalAttackCase = false, unitScale = unitScaleArr[unit], unitXTransition = unitXTransitionArr[unit], unitYTransition = unitYTransitionArr[unit], unitDyingAnimation = unitDyingAnimationArr[unit])
    }

    function makeEnemieUnit(unitSide, unit) {
        return newUnit = new Unit(health = unitHealthArr[unit], attack = unitAttackArr[unit], attackRange = unitAttackRange[unit], defence = unitDefenceArr[unit], manaUnitRequest = unitManaRequestArr[unit], unitXPos = battlefieldArea, unitYPos = gameAreaHeight - unitHeightArr[unit] - unitFarness, unitXVelocity = - unitXVelocityArr[unit], unitWidth = unitWidthArr[unit], unitHeight = unitHeightArr[unit], color = 'green', unitImg = unitWalkAnimationArr[unit][1], side = unitSide, attackingNow = false, attackTime = unitAttackTimeArr[unit], unitAnimation = unitAnimationArr[unit], unitWalkAnimation = unitWalkAnimationArr[unit], unitWalkTime = unitWalkTimeArr[unit], unitWalkPose = 0, walkingNow = false, typeOfUnit = unitTypeArr[unit], attackingBaseNow = false, attackCase = false, attackBaseCase = false, finalAttackCase = false, unitScale = unitScaleArr[unit], unitXTransition = unitXTransitionArr[unit], unitYTransition = unitYTransitionArr[unit], unitDyingAnimation = unitDyingAnimationArr[unit])
    }


    function shootAllieProjectile(sideOfProjectile, projectileXPos, projectileYPos, projectileXVelocity, projectileYVelocity, unit) {
        return projectile = new Projectile(sideOfProjectile = sideOfProjectile, projectileXPos = projectileXPos, projectileYPos = projectileYPos, projectileXVelocity = projectileXVelocity, projectileYVelocity = projectileYVelocity, unit, damage = archerAttack)
    }

    function shootEnemieProjectile(sideOfProjectile, projectileXPos, projectileYPos, projectileXVelocity, projectileYVelocity, unit) {
        return projectile = new Projectile(sideOfProjectile = sideOfProjectile, projectileXPos = projectileXPos, projectileYPos = projectileYPos, projectileXVelocity = projectileXVelocity, projectileYVelocity = projectileYVelocity, unit, damage = archerAttack)
    }


    function killUnit(unitArr, unit) {
        return unitArr = unitArr.slice(0, unitArr.indexOf(unit)).concat(unitArr.slice(unitArr.indexOf(unit) + 1, unitArr.length))
    }

    function destroyProjectile(projectileArr, projectile) {
        return projectileArr = projectileArr.slice(0, projectileArr.indexOf(projectile)).concat(projectileArr.slice(projectileArr.indexOf(projectile) + 1, projectileArr.length))
    }




    function drawTower(sideOfTower) {
        if (sideOfTower === 'allies') {
            alliesTower.draw()
        }
        else if (sideOfTower === 'enemies') {
            enemiesTower.draw()
        }
    }




    function addUnit(sideOfUnit, unit) {
        if (!unitAlliesArr) {
            unitAlliesArr = []
        }
        else if (!unitEnemiesArr) {
            unitEnemiesArr = []
        }
        if (sideOfUnit === 'allies') {
            unitAlliesArr.push(makeAllieUnit(sideOfUnit, unit - 1))
        }
        else if (sideOfUnit === 'enemies') {
            unitEnemiesArr.push(makeEnemieUnit(sideOfUnit, unit - 1))
        }
    }



    function addProjectile(sideOfProjectile, projectileXPos, projectileYPos, projectileXVelocity, projectileYVelocity, unit) {
        if (!projectileAllieArr) {
            projectileAllieArr = []
        }
        else if (!projectileEnemieArr) {
            projectileEnemieArr = []
        }
        if (sideOfProjectile === 'allies') {
            projectileAllieArr.push(shootAllieProjectile(sideOfProjectile = 'allies', projectileXPos, projectileYPos, projectileXVelocity, projectileYVelocity, unit)) 
        }
        else if (sideOfProjectile === 'enemies') {
            projectileEnemieArr.push(shootEnemieProjectile(sideOfProjectile = 'enemies', projectileXPos, projectileYPos, projectileXVelocity, projectileYVelocity, unit))
        }
    }



    // Регенерация маны
    let manaRegenerationDelay = 60
    let manaRegenerateTimeM = 0

    function manaRegeneration() {
        if (mana + manaIncome <= totalMana && !endOfGame && !gamePause && timeM === Math.round(manaRegenerateTimeM + manaRegenerationDelay) ) {
            mana += manaIncome
            manaRegenerateTimeM += manaRegenerationDelay
        }
        else if (mana + manaIncome > totalMana && !endOfGame && !gamePause && timeM === Math.round(manaRegenerateTimeM + manaRegenerationDelay) ) {
            mana += totalMana - mana
            manaRegenerateTimeM += manaRegenerationDelay
        }
    }

    function addUnitOnClickCase(x, y, unit) {
        if (Math.pow(buttonRadius, 2) >= Math.pow( x - (unitButtonStartXPosArr[unit - 1] + buttonRadius), 2) + Math.pow( y - (canvas.height - controlSectionHeight + unitButtonStartYPos + buttonHeight / 2), 2) && !unitCooldownCaseArr[unit - 1] && mana >= unitManaRequestArr[unit - 1] && !endOfGame) {
            mana -= unitManaRequestArr[unit - 1]
            addUnit('allies', unit)
            unitCooldownCaseArr[unit - 1] = true
        }
    }
    


    
    // Круглые кнопки призыва юнитов
    canvas.addEventListener('click', function(e) {
        let rect  = canvas.getBoundingClientRect()
        let x   = e.clientX - rect.left
        let y   = e.clientY - rect.top
        for (let i = 1; i <= 7; i++) {
            addUnitOnClickCase(x, y, i)
        }
    })


    // Призыв вражеских юнитов кнопками на клавиатуре
    addEventListener("keydown", function(event) {
        if (event.keyCode == 81) {
            addUnit('enemies', 1)    
        }
            
    })

    addEventListener("keydown", function(event) {
        if (event.keyCode == 87) {
            addUnit('enemies', 2)
        }
            
    })


    // Призыв юнитов кнопками на клавиатуре

    // addEventListener("keydown", function(event) {
    //     console.log(event.code)
    // })

    function addUnitOnKeyDown(unit) {

        addEventListener("keydown", function(event) {
            if (event.code == 'Digit' + unit && mana >= unitManaRequestArr[unit - 1] && !endOfGame && !unitCooldownCaseArr[unit - 1]) {
                mana -= unitManaRequestArr[unit - 1]
                addUnit('allies', unit)
                unitCooldownCaseArr[unit - 1] = true
            }
        })

    }

    for ( let i = 1; i <= 7; i++ ) {
        addUnitOnKeyDown(i)
    }

    // Перемещение по полю боя

    let xTranslateStep = 10
    let arrowLeft = false
    let arrowRight = false

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


    // Стрельба и управление балистой

    // Стрелка вверх

    // Стрелка вниз

    // a


    let arrowUp = false
    let arrowDown = false
    let keyA = false

    addEventListener("keydown", function(event) {
        if (event.code == 'ArrowUp') {
            event.preventDefault()
            arrowUp = true
        }   
    })

    addEventListener("keydown", function(event) {
        if (event.code == 'ArrowDown') {
            event.preventDefault()
            arrowDown = true
        }
    })

    addEventListener("keydown", function(event) {
        if (event.code == 'KeyA') {
            event.preventDefault()
            keyA = true
        }
    })

    addEventListener("keyup", function(event) {
        if (event.code == 'ArrowUp') {
            event.preventDefault()
            arrowUp = false
        }   
    })

    addEventListener("keyup", function(event) {
        if (event.code == 'ArrowDown') {
            event.preventDefault()
            arrowDown = false
        }
    })

    addEventListener("keyup", function(event) {
        if (event.code == 'KeyA') {
            event.preventDefault()
            keyA = false
        }
    })

    addEventListener("keyup", function(event) {
        if (event.code == 'Digit0' && !keyA) {
            event.preventDefault()
            keyA = true
        }
        else if (event.code == 'Digit0' && keyA) {
            event.preventDefault()
            keyA = false
        }
    })



    function navigation() {
         // Стрелка влево
        if (arrowLeft && xTranslate - xTranslateStep >= 0) {
            ctx.translate( + xTranslateStep, 0)
            xTranslate -= xTranslateStep
        }
        else if (arrowLeft && xTranslate - xTranslateStep < 0) {
            ctx.translate( + xTranslate, 0)
            xTranslate -= xTranslate

        }

        // Стрелка вправо
        if (arrowRight && xTranslate + xTranslateStep <= enemiesTower.xTowerPos - canvas.width + enemiesTower.towerWidth) {
            ctx.translate( - xTranslateStep, 0)
            xTranslate += xTranslateStep
        }
        else if (arrowRight && xTranslate + xTranslateStep > enemiesTower.xTowerPos - canvas.width + enemiesTower.towerWidth) {
            ctx.translate( - (enemiesTower.xTowerPos - canvas.width + enemiesTower.towerWidth - xTranslate), 0)
            xTranslate += (enemiesTower.xTowerPos - canvas.width + enemiesTower.towerWidth - xTranslate)
        }

    }

    // Стрельба и управление балистой

    function balista() {

        // Стрелка вверх
        if (arrowUp) {
            event.preventDefault()
            alliesTower.balistaAngle += angleStep
        }

        // Стрелка вниз
        if (arrowDown) {
            event.preventDefault()
            alliesTower.balistaAngle -= angleStep
        }

        // a
        if (keyA) {
            if (!balistaAttackingCase) {
                balistaAttackStartTimeM = timeM
                balistaAttackingCase = true
                let xVel = Math.cos(((alliesTower.balistaAngle) / 180) * Math.PI) * balistaProjectileMaxVelocity
                let yVel = - Math.sin(((alliesTower.balistaAngle) / 180) * Math.PI) * balistaProjectileMaxVelocity
                addProjectile(sideOfProjectile = 'allies', alliesTower.balistaAxisXPos - balistaProjectileWidth / 2, alliesTower.balistaAxisYPos - balistaProjectileHeight / 2, xVel, yVel)
            }
            else if ( timeM >= Math.round( balistaAttackStartTimeM + balistaReloadTimeM ) ) {
                balistaAttackingCase = false
            }
            // console.log('1', xVel, yVel, alliesTower.balistaAngle)
        }

    }
        
    

    


    // Основная функция
    
    function drawAll() {
        clear()
        navigation()
        controlSection(xTranslate)
        drawTower('allies')
        drawTower('enemies')
        balista()
        manaRegeneration()
        let unitAllie = unitAlliesArr.length - 1
        while (unitAllie >= 0) {
            unitAlliesArr[unitAllie].draw()
            unitAllie--
        }
        let unitEnemie = unitEnemiesArr.length - 1
        while (unitEnemie >= 0) {
            unitEnemiesArr[unitEnemie].draw()
            unitEnemie--
        }
        let projectileAllie = projectileAllieArr.length - 1
        while (projectileAllie >= 0) {
            projectileAllieArr[projectileAllie].draw()
            projectileAllie--
        }
        let projectileEnemie = projectileEnemieArr.length - 1
        while (projectileEnemie >= 0) {
            projectileEnemieArr[projectileEnemie].draw()
            projectileEnemie--
        }
        let corpses = corpsesArr.length - 1
        while (corpses >= 0) {
            corpsesArr[corpses].die()
            corpses--
        }
        if (endOfGame && !statisticsCase) {
            gameEnding(weakling)
        }
        if (statisticsCase) {
            statistics()
        }


        gameFrame = window.requestAnimationFrame(drawAll)
        if (!gamePause) {
            timeM += 1
            if (timeM % 60 === 0) {
                timeS = timeM/60
                // console.log(timeS)
            }
        }
        
        
    }

    // addEventListener("keydown", function(event) {
    //     if (event.keyCode == 13)
    //         window.requestAnimationFrame(drawAll)
    // })

    function showUnitInfoCase(x, y, unit) {
        if (Math.pow(buttonRadius, 2) >= Math.pow( x - (unitButtonStartXPosArr[unit] + buttonRadius), 2) + Math.pow( y - (canvas.height - controlSectionHeight + unitButtonStartYPos + buttonHeight / 2), 2)) {
            unitInformationCase[unit] = true
        }
        else {
            unitInformationCase[unit] = false
        }
    }

    let xTranslateCase = false

    addEventListener('mousemove', function(e) {
        

        let rect  = canvas.getBoundingClientRect()
        let x  = e.clientX - rect.left
        let y  = e.clientY - rect.top

        for (let i = 0; i <= 6 ; i++ ) {
            showUnitInfoCase(x, y, i)
        }

        if (xTranslateCase && xTranslate - e.movementX >= 0 && xTranslate - e.movementX <= enemiesTower.xTowerPos - canvas.width + enemiesTower.towerWidth) {
            ctx.translate(e.movementX, 0)
            xTranslate -= e.movementX
        }
        else if (xTranslateCase && xTranslate - e.movementX < 0) {
            ctx.translate(xTranslate, 0)
            xTranslate -= xTranslate
        }
        else if (xTranslateCase && xTranslate - e.movementX > enemiesTower.xTowerPos - canvas.width + enemiesTower.towerWidth) {
            ctx.translate(-(enemiesTower.xTowerPos - canvas.width + enemiesTower.towerWidth - xTranslate), 0)
            xTranslate += enemiesTower.xTowerPos - canvas.width + enemiesTower.towerWidth - xTranslate
        }
    })

    // canvas.addEventListener('click', function(e) {
    //     console.log()
    // })

    canvas.addEventListener('mousedown', function(e) {
        let rect  = canvas.getBoundingClientRect()
        let x   = e.clientX - rect.left
        let y   = e.clientY - rect.top
        // console.log(x, y)
        if (y < gameAreaHeight) {
            xTranslateCase = true
        }
    })

    canvas.addEventListener('mouseup', function(e) {
        xTranslateCase = false
    })

    // canvas.addEventListener('mouseup', function(e) {
    //     xTranslateCase = false
    // })



    canvas.addEventListener('click', function(e) {
        let rect  = canvas.getBoundingClientRect()
        let x   = e.clientX - rect.left
        let y   = e.clientY - rect.top
        if (Math.pow(buttonRadius, 2) >= Math.pow( x - (canvas.width / 2 + buttonRadius), 2) + Math.pow( y - (20 + buttonHeight / 2), 2) && !gamePause) {
            pauseButtonColor = 'red'
            gamePause = true
            // window.cancelAnimationFrame(gameFrame)
        }
        else if (Math.pow(buttonRadius, 2) >= Math.pow( x - (canvas.width / 2 + buttonRadius), 2) + Math.pow( y - (20 + buttonHeight / 2), 2) && gamePause) {
            pauseButtonColor = 'green'
            gamePause = false 
            // gameFrame = window.requestAnimationFrame(drawAll)
        }
    })




    drawAll()

    // Игра
    // Управление параметрами
    // Солнце
    // Одновременное нажатие клавиш
    // Сила тяготения
    // Улучшения
    // Загрузить картинки
    // Статы
    // Информационное окно
    // Балиста натяжение
    // Плавность
    // Марианна Крейцина - Marry Ann
    // Кровавый бассейн
    // Остановка времени
    
    
})
