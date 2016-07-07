'use strict'

class Accounts{


    constructor(name, password, email )
    {
        this._userName = name;
        this._password = password;
        this._email= email;
        this._playerGames=[];
        this._numWin;
	    this._numLoss;
        this._overallRatio;
        this._userBestGame;
        this._userSkillLevel;
    }

    /**
     * setPlayerStats( player )
     * updates User account with game stats stored in player
     * Stores game states in player_Games
     */
    set playerStats( player )
    {
        var gameStat={
            gameDate: player.startDate(),
            gameResult: player.result(),
            gameTime: player.playTime(),
            gameScore: player.score(),
            gameCaptured: player.captured(),
            gameMoves: player.playerHistory(),
            gameSkill: player.skill()
        };
        if(gameStat.gameResult == 1)
            this._numWin += 1;
        else
            this._numLoss += 1;

        this._overallRatio= this._numWin / this._numLoss;
        this._playerGames.push(gameStat);
        this.calculateBestGame();
    }

    /**
     * returns Overall Ratio
     */
    get overallRatio()
    {
        return this._overallRatio;
    }
    /**
     * returns users skill level
     */
    get userSkillLevel()
    {
        return this._userSkillLevel;
    }
    /**
     * returns index of users best game
     */
    get userBestGame()
    {
        return this._userBestGame;
    }

    /**
     * Finds users best game
     * Updates users skill level
     */
    calculateBestGame()
    {
        var Skill=0;
        this._userSkillLevel=0;

        for(var i= 0; i< this._playerGames.length; i++)
        {
            this._userSkillLevel += this._playerGames[i].gameSkill;
            if(this._playerGames[i].gameResult == 0)
                i++;
            else if(Skill < this._playerGames[i].gameSkill){
                Skill= this._playerGames[i].gameSkill;
                this._userBestGame= i;
            }
        }
    }

}
