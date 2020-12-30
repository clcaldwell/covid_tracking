$changes = [System.Collections.ArrayList]@()

function getAvgChange ($numArr) {
    #|2209665 - 2241990|/2209665 = 32325/2209665 = 0.014628914337694 = 1.4628914337694%

    #$diff = ( ( [math]::abs( $numArr[$i-1] - $numArr[$i] ) ) / $numArr[$i-1] ) / $numArr[$i-1]
    #$step3 = $numArr[$i-1] + ( $numArr[$i-1] * ($diff))

    for ($i = 0; $i -lt $numArr.length-1; $i++) {
        Write-Host "i: $($i)"
        $diff = ( ( 
                    [math]::abs( $numArr[$i-1] - $numArr[$i] ) 
                ) / $numArr[$i-1] 
        ) / $numArr[$i-1]
        Write-Host "diff: $($diff)"
        $change = $numArr[$i-1] + ( $numArr[$i-1] * ($diff))
        Write-Host "change: $($change)"
        $changes.add(
            [PSCustomObject]@{
                Diff=$diff;
                Change=$change;
                current=$numArr[$i]
            }) | Out-Null
    }
}

getAvgChange($NumArr)

$changes