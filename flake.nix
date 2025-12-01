{
  inputs.nixpkgs.url = "nixpkgs";
  outputs =
    { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
      bg = cmd: "${pkgs.coreutils-full}/bin/nohup ${cmd} 1>/dev/null 2>&1 &";
      bruno-bg = pkgs.writeScriptBin "br" (bg "${pkgs.bruno}/bin/bruno");
      firefox-bg = pkgs.writeScriptBin "ff" (bg "${pkgs.firefox-devedition}/bin/firefox-devedition");
    in
    {
      # Utilized by `nix develop`
      devShell.${system} = pkgs.mkShell {
        buildInputs =
          (with pkgs; [
            nodejs_22
            openssl
            cacert
          ])
          ++ [
            bruno-bg
            firefox-bg
          ];
        shellHook = "exec zsh";
      };
    };
}
