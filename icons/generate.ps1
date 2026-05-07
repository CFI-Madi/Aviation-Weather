Add-Type -AssemblyName System.Drawing

function Make-Icon {
  param([int]$Size, [string]$OutPath)

  $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
  $g   = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

  # Solid navy background (#0C1B33), full canvas - maskable safe
  $g.Clear([System.Drawing.Color]::FromArgb(255, 12, 27, 51))

  # Sky-blue rounded "badge" inside the 80% safe zone
  $skyBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 56, 189, 248))
  $pad      = [int]($Size * 0.18)
  $cw       = $Size - 2 * $pad
  $ch       = [int]($cw * 0.78)
  $cx0      = $pad
  $cy0      = [int](($Size - $ch) / 2)
  $r        = [int]($ch * 0.30)

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc($cx0,                  $cy0,                  $r * 2, $r * 2, 180, 90)
  $path.AddArc($cx0 + $cw - $r * 2,   $cy0,                  $r * 2, $r * 2, 270, 90)
  $path.AddArc($cx0 + $cw - $r * 2,   $cy0 + $ch - $r * 2,   $r * 2, $r * 2,   0, 90)
  $path.AddArc($cx0,                  $cy0 + $ch - $r * 2,   $r * 2, $r * 2,  90, 90)
  $path.CloseFigure()
  $g.FillPath($skyBrush, $path)

  # White airplane silhouette (top-down, nose up). Coords are fractions of $pSize centered on (cx, cy).
  $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
  $pSize = [int]($Size * 0.50)
  $cx    = $Size / 2.0
  $cy    = $Size / 2.0

  $coords = @(
    @( 0.00, -0.50),  # nose tip
    @( 0.06, -0.20),  # body, wing root leading
    @( 0.48, -0.02),  # right wingtip leading
    @( 0.48,  0.06),  # right wingtip trailing
    @( 0.06,  0.04),  # body, wing root trailing
    @( 0.06,  0.30),  # body, tail root leading
    @( 0.20,  0.40),  # right tail tip leading
    @( 0.20,  0.46),  # right tail tip trailing
    @( 0.04,  0.36),  # body, tail root trailing
    @( 0.00,  0.50),  # tail end
    @(-0.04,  0.36),
    @(-0.20,  0.46),
    @(-0.20,  0.40),
    @(-0.06,  0.30),
    @(-0.06,  0.04),
    @(-0.48,  0.06),
    @(-0.48, -0.02),
    @(-0.06, -0.20)
  )

  $pts = New-Object 'System.Drawing.PointF[]' $coords.Length
  for ($i = 0; $i -lt $coords.Length; $i++) {
    $pts[$i] = New-Object System.Drawing.PointF(
      [float]($cx + $coords[$i][0] * $pSize),
      [float]($cy + $coords[$i][1] * $pSize)
    )
  }
  $plane = New-Object System.Drawing.Drawing2D.GraphicsPath
  $plane.AddPolygon($pts)
  $g.FillPath($whiteBrush, $plane)

  $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
  Write-Host "Wrote $OutPath ($Size x $Size)"
}

$out = "C:\aviation weather claude\icons"
Make-Icon -Size 192 -OutPath "$out\icon-192.png"
Make-Icon -Size 512 -OutPath "$out\icon-512.png"
