const SourcemapUtil = {

  findInstructionNum(content, pos) {

    // Sweep back from pos looking for returns.
    // Remember where spaces are found.
    // When a return is found, read the instruction number.
    let prevChar = "";
    let spaceIdx = 1;
    let char = content.charAt(pos);
    while(pos !== 0 && prevChar !== "\n") {
      char = content.charAt(pos);
      if(char === " ") spaceIdx = pos;
      pos--;
      prevChar = content.charAt(pos - 1);
    }
    return parseInt(content.substring(pos, spaceIdx));
  },

  disassemblerRangeToInstructionRange(content, range) {
    const start = SourcemapUtil.findInstructionNum(content, range.start);
    const end = SourcemapUtil.findInstructionNum(content, range.end);
    return { start, end }
  },

  disassemblerRangeToSourceRange(content, range, srcmap) {

    const instructionRange = SourcemapUtil.disassemblerRangeToInstructionRange(content, range);

    // TODO: decompress srcmap
    
    // TODO: translate coord to src range

    // TODO: translate instruction range to source range

    return {
      start: 0,
      end: 100
    }
  }
}

module.exports = SourcemapUtil;
